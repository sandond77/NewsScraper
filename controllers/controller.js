var express = require('express');
var router = express.Router();
var db = require('../models');
var path = require('path');
var request = require("request");
var cheerio = require("cheerio");


router.get('/', function(req, res){
	db.Headline.find({}).
		then(function(results){
			results = results.reverse();
			res.render('index',{results});
			// res.json(dbHeadlines);
		})
});

router.get('/saved', function(req, res){
	db.Headline.find({}).
		then(function(results){
			res.render('saved',{results});
		})
});

router.get('/api', function(req, res){
	db.Headline.find({}).
		then(function(results){
			res.json(results);
		})
});


router.put('/save',function(req,res){
	console.log("ajax sent")
	console.log(req.body.id)
	db.Headline.findByIdAndUpdate(
	{ 
     	_id: req.body.id
    },
    {
        $set: { 
    		saved: true
    	}
    }).then(function(){
    	console.log("Save complete")
    });
})

router.put('/remove',function(req,res){
	console.log("ajax sent")
	console.log(req.body.id)
	db.Headline.findByIdAndUpdate(
	{ 
     	_id: req.body.id
    },
    {
        $set: { 
    		saved: false
    	}
    }).then(function(){
    	res.send("Removal complete")
    });
})

router.get('/api/scrape', function(req,res){
	request("https://www.reddit.com/r/news/", function(error, response, html) {
	  	var $ = cheerio.load(html);
	  	var results = [];

	  	$("p.title").each(function(i, element) {
		    var title = $(element).text();
		    var link = $(element).children().attr("href");

			results.push({
		      	title: title,
		      	link: link
	    	});
	  	});

	  	results = results.reverse();

	  	for (var i = 0; i < results.length; i++) {
	  		db.Headline.update(
		  		{
		  			link: results[i].link
		  		},
		  		{
		  			$set:{
		  				title: results[i].title,
		  				link: results[i].link,
		  			}
		  		},
		  		{
		  			upsert: true,
		  			setDefaultsOnInsert: true
		  		}
	  		).catch(function(err) {
         		 return res.json(err);
        	});
	  	}
	  	res.send("database updated")
	});
});

router.get("/api/:id", function(req, res) {
	console.log("get received")
    db.Headline.findOne(
	    { 
	      _id: req.params.id
	    }
    ).populate("note")
    	.then(function(results){
     		console.log("get request successful")
     		res.send(results)
    	})	  	
    	.catch(function(err) {
	    	res.json(err);
	  	});
	// res.send("test response")
});

router.post("/api/:id", function(req,res){
	console.log("post received")
	console.log("req.body",req.body)
  	db.Note.create(req.body)
	    .then(function(dbNote) {
      		return  db.User.findOneAndUpdate({_id: req.params.id}, {notes: dbNote._id }, { new: true });
	    }).then(function(response) {
	  	console.log("db updated")
	    res.json(response);
	  })
	  .catch(function(err) {
	    res.json(err);
	  });
});


module.exports = router;

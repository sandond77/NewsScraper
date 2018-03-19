var express = require('express');
var router = express.Router();
var db = require('../models');
var path = require('path');
var request = require("request");
var cheerio = require("cheerio");


router.get('/', function(req, res){
	db.Headline.find({}).
		then(function(results){
			res.render('index',{results});
			// res.json(dbHeadlines);
		})
});

router.get('/scrape', function(req,res){
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

	  	res.json(results)

      	db.Headline.create(results)
        .then(function(dbHeadlines) {
        	console.log("Scrape Complete")
        })
        .catch(function(err) {
          return res.json(err);
        });
	});
});




module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('../models');
var path = require('path');
var request = require("request");
var cheerio = require("cheerio");


router.get('/', function(req, res){
  	res.render('index');
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

      	db.Headline.create(results)
        .then(function(dbHeadlines) {
        })
        .catch(function(err) {
          return res.json(err);
        });
	});
	console.log("Scrape Complete")
});




module.exports = router;

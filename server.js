var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var path = require('path');
var port = process.env.PORT || 3000;
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Serve static content for the app from the 'public' directory
// app.use('public', express.static(path.join(__dirname, '/public')));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ 
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views/layouts')
 }));
app.set('view engine', 'handlebars');

var router = require('./controllers/controller.js');
app.use(router);

app.listen(port, function(){
	console.log("App now listening at localhost:" + port);
});


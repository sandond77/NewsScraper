var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
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

var app = express();

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


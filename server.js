var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

var port = process.env.PORT || 3000;

var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var app = express();

app.use(bodyParser.json());
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


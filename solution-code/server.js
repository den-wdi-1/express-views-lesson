var express = require('express');
var path = require('path'); // lets us normalize path strings to different views
var logger = require('morgan'); // for debugging
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/candies-app');

var routes = require('./config/routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Set up our app to accept to use Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(routes);

app.listen(3000);
console.log('Listening on port 3000');

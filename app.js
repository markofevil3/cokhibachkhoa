'use strict';

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cokhi');

app.configure(function() {
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.bodyParser({ uploadDir: __dirname + '/public/img/uploads/products' }));
  app.use(express.methodOverride());
  app.use(express.cookieParser());  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//client
app.get('/', routes.index);
app.get('/contactUs', routes.contactUs);
app.get('/aboutUs', routes.aboutUs);
app.get('/products', routes.products);
app.get('/services', routes.services);
app.get('/training', routes.training);

//server
app.get('/admin', routes.login);
app.get('/login', routes.login);
app.get('/manageProducts', routes.manageProducts);

app.post('/manageProducts', routes.manageProducts);
app.post('/manage', routes.manage);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
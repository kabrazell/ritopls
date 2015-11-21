'use strict';

var express = require('express');
var http = require('http');
var https = require('https');
var _ = require('lodash');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({
    limit: '50mb'
})); //Bigger!
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
})); //Bigger!

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, CONNECT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    next();
});

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //allows non certified access

// ========== Authentication ==========
var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'rito' && user.pass === 'pls') {
    return next();
  } else {
    return unauthorized(res);
  };
};

// ============= Services =============

// ============= Routes =============
require('./routes/routes')(app);

app.listen(3000);
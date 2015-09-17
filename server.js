'use strict';

var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/recipes_test');

process.env.APP_SECRET = process.env.APP_SECRET || 'SEKRITSKWIRL';

var router = require('./routes/recipes_routes');
var userRouter = require('./routes/user_routes');

app.use(express.static(__dirname + '/build'));
app.use('/api/', router);
app.use('/api/', userRouter);

var port = process.env.port || 3000;
app.listen(port, function () {
    console.log('server is live on: ' + port);
});

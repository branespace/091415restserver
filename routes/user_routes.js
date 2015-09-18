var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/error_handler');
var httpBasic = require(__dirname + '/../lib/http_basic');
var async = require('async');

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function (req, res) {
    var newUser = new User();
    newUser.basic.username = req.body.username;
    newUser.username = req.body.username;
    async.waterfall([

            function (callback) {
                newUser.generateHash(req.body.password, callback);
            }.bind(this),

            function (hash, callback) {
                newUser.save(callback);
            }.bind(this),

            function (data, num, callback) {
                newUser.generateToken(callback);
            }.bind(this),

            function (token) {
                return res.json({token: token});
            }.bind(this)],

        function (err) {
            if (err) return handleError(err, res);
        }.bind(this)
    );
});

usersRouter.get('/signin', httpBasic, function (req, res) {

    async.waterfall([

            function (callback) {
                User.findOne({'basic.username': req.auth.username}, callback);
            }.bind(this),

            function (user, callback) {
                if (!user) {
                    console.log('could not authenticat: ' + req.auth.username);
                    return res.status(401).json({msg: 'could not authenticat'});
                }
                this.user = user;
                user.compareHash(req.auth.password, callback);
            }.bind(this),

            function (hashRes, callback) {
                if (!hashRes) {
                    console.log('could not authenticat: ' + req.auth.username);
                    return res.status(401).json({msg: 'authenticat says NOOOOOO!'});
                }
                this.user.generateToken(callback);
            }.bind(this),

            function (token) {
                res.json({token: token});
            }

        ],

        function (err) {
            if (err) return handleError(err, res);
        }.bind(this)
    );
});
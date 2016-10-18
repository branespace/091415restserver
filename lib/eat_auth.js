var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/error_handler');
var async = require('async');

module.exports = exports = function (req, res, next) {
    var encryptedToken = req.headers.token || (req.body ? req.body.token : undefined);
    if (!encryptedToken)
        return res.status(401).json({msg: 'could not authenticat'});

    async.waterfall([

            function (callback) {
                eat.decode(encryptedToken, process.env.APP_SECRET, callback);
            }.bind(this),

            function (token, callback) {
                User.findOne({_id: token.id}, callback);
            }.bind(this),

            function(user){
                if (!user) return res.status(401).json({msg: 'could not authenticat'});
                req.user = user;
                return next();
            }.bind(this)

        ],

        function (err) {
            if (err) return handleError(err, res);
        }.bind(this)
    );
};
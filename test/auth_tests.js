var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/recipes_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');

describe('http basic', function () {
    it('should parse basic http auth', function () {
        var req = {
            headers: {
                authorization: 'Basic ' + (new Buffer('test:test')).toString('base64')
            }
        };
        httpBasic(req, {}, function () {
            expect(typeof req.auth).to.eql('object');
            expect(req.auth.username).to.eql('test');
            expect(req.auth.password).to.eql('test');
        });
    });
});

describe('auth', function () {
    after(function (done) {
        User.remove({username: "test"}, function (err) {
            if (err) throw err;
            User.remove({username: "test2"}, function (err) {
                if (err) throw err;
                done();
            });
        });
    });

    it('should create a user', function (done) {
        chai.request('localhost:3000/api')
            .post('/signup')
            .send({username: 'test', password: 'test'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.token).to.have.length.above(0);
                done();
            });
    });
    describe('existing user', function () {
        before(function (done) {
            var user = new User();
            user.username = 'test2';
            user.basic.username = 'test2';
            user.generateHash('test', function (err, res) {
                if (err) throw err;
                user.save(function (err, data) {
                    if (err) throw err;
                    user.generateToken(function (err, token) {
                        if (err) throw err;
                        this.token = token;
                        done();
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        });

        it('should be able to sign in', function (done) {
            chai.request('localhost:3000/api')
                .get('/signin')
                .auth('test2', 'test')
                .end(function (err, res) {
                    expect(err).to.eql(null);
                    expect(res.body.token).to.have.length.above(0);
                    done();
                });
        });

        it('should auth with eat auth', function (done) {
            var token = this.token;
            var req = {
                headers: {
                    token: token
                }
            };
            eatAuth(req, {}, function () {
                expect(req.user.username).to.eql('test2');
                done();
            });
        });

    });

});
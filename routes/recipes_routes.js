/*jshint -W083 */

var Recipe = require('./../models/recipe');
var Ingredient = require('./../models/ingredient');
var jsonParser = require('body-parser').json();
var express = require('express');
var handleError = require('./../lib/error_handler');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var router = module.exports = exports = express.Router();

router.get('/recipes', function (req, res) {
    Recipe.find({}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.get('/recipes/:id', function (req, res) {
    Recipe.find({_id: req.params.id}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.post('/recipes', jsonParser, eatAuth, function (req, res) {
    var newRecipe = new Recipe(req.body);
    newRecipe.cook = req.user.username;
    var ingredients = new Recipe(req.body.ingredients.split(' '));
    for (var i = 0; i < ingredients.length; i++) {
        var newIngredient = new Ingredient(ingredients[i]);
        newIngredient.save(function (err, data) {
            if (err) return handleError(err, res);
        });
    }
    newRecipe.save(function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.delete('/recipes/:id', jsonParser, eatAuth, function (req, res) {
    Recipe.remove({_id: req.params.id}, function (err) {
        if (err) return handleError(res, err);
        res.json({msg: req.params.id + ' deleted'});
    });
});
router.put('/recipes/:id', jsonParser, eatAuth, function (req, res) {
    var newRecipe = req.body;
    Recipe.update({_id: req.params.id}, newRecipe, function (err, data) {
        if (err) return handleError(res, err);
        res.json({link: '/recipes/' + req.params.id});
    });
});
router.get('/ingredient', function (req, res) {
    Ingredient.find({}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.get('/ingredient/:id', function (req, res) {
    Ingredient.find({_id: req.params.id}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});

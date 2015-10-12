/*jshint -W083 */

var Recipe = require('./../models/recipe');
var Ingredient = require('./../models/ingredient');
var bodyParser = require('body-parser').json();
var express = require('express');
var handleError = require('./../lib/error_handler');

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
router.post('/recipes', bodyParser, function (req, res) {
    var newRecipe = new Recipe(req.body);
    var ingredients = new Recipe(req.body.ingredients.split(' '));
    for (var i = 0; i < ingredients.length; i++) {
        var newIngredient = new Ingredient(ingredients[i]);
        newIngredient.save(function(err, data){
            if (err) return handleError(err, res);
        });
    }
    newRecipe.save(function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.delete('/recipes/:id', function (req, res) {
    Recipe.remove({_id: req.params.id}, function (err) {
        if (err) return handleError(res, err);
        res.json({msg: req.params.id + ' deleted'});
    });
});
router.put('/recipes/:id', bodyParser, function (req, res) {
    var newRecipe = req.body;
    Recipe.update({_id: req.params.id}, newRecipe, function (err, data) {
        if (err) return handleError(res, err);
        res.json({link: '/recipes/' + req.params.id});
    });
});
router.get('/ingredient', bodyParser, function (req, res) {
    Ingredient.find({}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});
router.get('/ingredient/:id', bodyParser, function (req, res) {
    Ingredient.find({_id: req.params.id}, function (err, data) {
        if (err) return handleError(res, err);
        res.json(data);
    });
});

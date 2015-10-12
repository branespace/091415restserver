'use strict';

var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
  recipeName: {type: String, match: /[^\n]+/},
  recipeBody: {type: String, match: /[^\n]+/},
  ingredients: {type: String, match: /[^\n]+/},
  cook: {type: String, default: 'The Chef'},
  picture: String
});

module.exports = mongoose.model('Recipe', recipeSchema);

'use strict';

var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
  ingredientName: {type: String, match: /[^\n]+/},
  description: String,
  picture: String
});

module.exports = mongoose.model('Ingredient', ingredientSchema);

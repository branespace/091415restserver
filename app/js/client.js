require('angular/angular');

var recipesApp = angular.module('recipesApp', []);
require('./recipes/recipes')(recipesApp);

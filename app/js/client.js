require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var recipesApp = angular.module('recipesApp', ['ngRoute', 'base64', 'ngCookies']);

require('./recipes/recipes')(recipesApp);
require('./services/services')(recipesApp);
require('./users/users')(recipesApp);
require('./logout')(recipesApp);
require('./router')(recipesApp);

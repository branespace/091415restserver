require('angular/angular');

var recipesApp = angular.module('recipesApp', []);

recipesApp.controller('recipesController', ['$scope', function($scope) {
  $scope.readme = 'RECIPE SAFE';
}]);

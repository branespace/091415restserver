module.exports = function(app) {
  app.controller('RecipesController',
      ['$scope', 'Resource', '$http', '$cookies', '$location', function($scope, Resource, $http, $cookies, $location) {
        
    var cookie = $cookies.get('token');
    if (!(cookie && cookie.length)) {
      $location.path('/signup');
    }

    $http.defaults.headers.common.token = cookie;
    $scope.recipes = [];
    $scope.newRecipe = {_id: 'new'};
    var resource = Resource();

    $scope.clearNewRecipe = function() {
      $scope.newRecipe = {_id: 'new'};
    };

    $scope.getRecipes = function() {
      resource.getAll(function(err, data) {
        if (err) { return console.log(err); }
        $scope.recipes = data;
      });
    };

    $scope.createRecipe = function(recipe) {
      delete recipe._id;
      resource.create(function(err, data) {
        if (err) { return console.log(err); }
        $scope.newRecipe = {};
        $scope.recipes.push(data);
      }, recipe);
    };

    $scope.beginEdit = function(recipe) {
      recipe.oldName = recipe.recipeName;
      recipe.oldBody = recipe.recipeBody;
      recipe.oldIngredients = recipe.ingredients;
      recipe.oldCook = recipe.cook;
      recipe.editing = true;
    };

    $scope.cancelEdit = function(recipe) {
      recipe.recipeName = recipe.oldName;
      recipe.recipeBody = recipe.oldBody;
      recipe.ingredients = recipe.oldIngredients;
      recipe.cook = recipe.oldCook;
      recipe.editing = false;
    };

    $scope.updateRecipe = function(recipe) {
      recipe.editing = false;
      recipe.pendingUpdate = true;
      resource.update(function(err, data) {
        if (err) { return console.log(err); }
        recipe.pendingUpdate = false;
      }, recipe);
    };

    $scope.deleteRecipe = function(recipe) {
      recipe.pendingDelete = true;
      resource.remove(function(err, data) {
        if (err) { return console.log(err); }
        recipe.pendingDelete = false;
        $scope.recipes.splice($scope.recipes.indexOf(recipe), 1);
      }, recipe);
    };

  }]);
};

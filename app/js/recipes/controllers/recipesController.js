module.exports = function(app) {
  app.controller('RecipesController', ['$scope', '$http', function($scope, $http) {
    $scope.recipes = [];

    $scope.getRecipes = function() {
      $http.get('/api/recipes')
        .then(function(res) {
            $scope.recipes = res.data;  
          }, function(res) {
            console.log(res);
          });
    
    };

    $scope.newRecipe = function(recipe) {
      $http.post('/api/recipes', recipe) 
        .then(function(res) {
          $scope.recipes.push(recipe);
        }, function(res) {
          console.log(res);
        });
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
      $http.put('/api/recipes/' + recipe._id, recipe)
        .then(function(res) {
          recipe.pendingUpdate = false;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.deleteRecipe = function(recipe) {
      recipe.pendingDelete = true;
      $http.delete('/api/recipes/' + recipe._id)
        .then(function(res) {
          $scope.recipes.splice($scope.recipes.indexOf(recipe), 1);
        }, function(res) {
          recipe.pendingDelete = false;
          console.log(res);
        });
    };
    
  }]);
};

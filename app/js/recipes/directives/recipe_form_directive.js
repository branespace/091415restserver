module.exports = function(app) {
  app.directive('recipeForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/recipes/directives/recipe_form_template.html',
      scope: {
        title: '@',
        buttonText: '@',
        recipe: '=',
        cancel: '&',
        save: '&'
      },
    };
  });
};

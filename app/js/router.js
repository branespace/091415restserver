module.exports = function(recipesApp) {
  recipesApp.config(['$routeProvider', function($route) {
    $route
      .when('/recipes', {
        templateUrl: '/templates/recipes/views/recipes_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signup'
      });
  }]);
};

module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$http', '$base64', '$location', '$cookies', function($scope, $http, $base64, $location, $cookies) {
    $scope.buttonText = 'Log In' ;
    $scope.user = {};
    $scope.changePlacesText = 'Create New User';

    $scope.changePlaces = function() {
      return $location.path('/signup');
    };
  
    $scope.sendToServer = function(user) {
      $http({method: 'GET', url: '/api/signin', headers: {'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)}})
        .then(function(res) {
          $cookies.put('token', res.data.token);
          $scope.getUserName();
          $location.path('/recipes');
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};

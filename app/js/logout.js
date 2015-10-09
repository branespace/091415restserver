module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$location', '$http',
      function($scope, $cookies, $location, $http) {

    $scope.loggedIn = function() {
      var cookie = $cookies.get('token');
      return cookie && cookie.length;
    };

    $scope.logOut = function() {
      $cookies.remove('token');
      $location.path('/signin');
    };

    $scope.getUserName = function() {
      var cookie = $cookies.get('token');
      if (!(cookie && cookie.length)) {
      }

      $http({method: 'GET', url: '/api/username', headers: {token: cookie}})
        .then(function(res) {
          $scope.username = res.data.username;
        }, function(res) {
        
        });
    };

    if ($scope.loggedIn()) {
      $scope.getUserName();
    }
  }]);
};

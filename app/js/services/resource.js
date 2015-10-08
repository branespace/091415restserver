function handleError(callback) {
  return function(res) {
    callback(res);
  };
}

function handleSuccess(callback) {
  return function(res) {
    callback(null, res.data);
  };
}

module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = {};

    Resource.getAll = function(callback) {
      $http.get('/api/recipes')
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.create = function(callback, recipe) {
      $http.post('/api/recipes', recipe)
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.remove = function(callback, recipe) {
      $http.delete('/api/recipes/' + recipe._id)
        .then(handleSuccess(callback), handleError(callback));
    };

    Resource.update = function(callback, recipe) {
      $http.put('/api/recipes/' + recipe._id, recipe)
        .then(handleSuccess(callback), handleError(callback));
    };

    return function() {
      return Resource;
    };

  }]);
};

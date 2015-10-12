require(__dirname + '/../../app/js/client.js');
require('angular-mocks');

describe('recipes controller', function(){
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('recipesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should create the controller', function() {
    var controller = new $ControllerConstructor('RecipesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.recipes)).toBe(true);
  });

  describe('RESTY REQUESTIES', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope;
      $ControllerConstructor('RecipesController', {$scope: $scope});
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request on getRecipes', function() {
      $httpBackend.expectGET('/api/recipes').respond(200, [{'recipeName':'Fish'}]);
      $scope.getRecipes();
      $httpBackend.flush();
      expect($scope.recipes[0].recipeName).toBe('Fish');
    });

    it('should make a POST request', function() {
      $httpBackend.expectPOST('/api/recipes', {recipeName:"testRecipe"}).respond(200, {_id: '1', recipeName:'testRecipe'});
      $scope.newRecipe({recipeName:'testRecipe'});
      $httpBackend.flush();
      expect($scope.recipes[0].recipeName).toBe('testRecipe');
    });

    it('should delete recipes', function() {
      $scope.recipes.push({_id: 1000, recipeName:'deleteme'});
      $httpBackend.expectDELETE('/api/recipes/1000').respond(200);
      $scope.deleteRecipe($scope.recipes[0]);
      $httpBackend.flush();
      expect($scope.recipes.length).toBe(0);
    });

    it('should update recipes', function() {
      $scope.recipes.push({_id: 1000, recipeName:'updateme', recipeBody:'buyinstore', ingredients:'none', cook:'ChefBoyardee'});
      $httpBackend.expectPUT('/api/recipes/1000', {_id: 1000, recipeName:'updateme', recipeBody:'buyinstore', ingredients:'none', cook:'ChefBoyardee', editing: false, pendingUpdate: true}).respond(200);
      $scope.updateRecipe($scope.recipes[0]);
      $httpBackend.flush();
      expect($scope.recipes[0].recipeName).toBe('updateme');
    });

  });
});

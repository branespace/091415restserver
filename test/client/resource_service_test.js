require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('recipesApp'));
  var resource;
  var $httpBackend;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    resource = Resource();
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/recipes').respond(200,
      [{recipeBody: 'test recipe', _id: 1}]);
    resource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });

  it('should make a post request', function() {
    $httpBackend.expectPOST('/api/recipes',
      {recipeBody: 'test'}).respond(200, {recipeBody: 'test'});
    resource.create(function(err, data) {
      expect(err).toBe(null);
      expect(data.recipeBody).toBe('test');
    }, {recipeBody: 'test'});
    $httpBackend.flush();
  });

  it('should make a put request', function() {
    $httpBackend.expectPUT('/api/recipes/1',
      {recipeBody: 'test', _id: 1}).respond(200);
    resource.update(function(err, data) {
      expect(err).toBe(null);
    }, {recipeBody: 'test', _id: 1});
    $httpBackend.flush();
  });

  it('should make a delete request', function() {
    $httpBackend.expectDELETE('/api/recipes/1').respond(200);
    resource.remove(function(err, data) {
      expect(err).toBe(null);
    }, {recipeBody: 'test', _id: 1});
    $httpBackend.flush();
  });
});

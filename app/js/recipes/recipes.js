module.exports = function(app) {
  require('./controllers/recipesController')(app);
  require('./directives/recipe_form_directive')(app);
};

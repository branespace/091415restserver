"use strict"

var chai = require("chai");
var expect = chai.expect;
var chaihttp = require("chai-http");
var url = "localhost:3000/api";
process.env.MONGO_URL = "mongodb://localhost/recipes_test";
var mongoose = require("mongoose");
var Recipe = require("./../models/recipe");

chai.use(chaihttp);

require("./../server.js");

describe("recipes resource get/post", function(){
  it("should return recipes on get", function(done){
    chai.request(url)
      .get("/recipes")
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });
  it("should save recipes", function(done){
    chai.request(url)
      .post("/recipes")
      .send({recipeName:'posttest'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.recipeName).to.eql('posttest');
        done();
    });
  });
  after(function(done){
    Recipe.remove({recipeName:"posttest"}, function (err){
      if (err) throw err;
      done();
    });
  })
  describe('recipes resource put/delete', function(){
    var recID;
    var recID2;
    before(function(done){
      var newRecipe = new Recipe({recipeName:'deletetest'});
      var newRecipe2 = new Recipe({recipeName:'puttest'});
      newRecipe.save(function(err,data){
        if (err) throw err;
        recID = data._id;
        newRecipe2.save(function(err,data){
          if (err) throw err;
          recID2 = data._id;
          done();
        });
      });
    });
    it('should delete recipes', function(done){
      chai.request(url)
        .delete('/recipes/' + recID)
        .end(function(err, res){
            expect(err).to.eql(null);
            Recipe.find({recipeName:"deletetest"}, function(err, data){
              if (err) throw err;
              expect(data).to.deep.eql([]);            
              done();
            })
        });
    });
    it('should update recipes', function(done){
      chai.request(url)
        .put('/recipes/' + recID2)
        .send({recipeName: 'puttest2'})
        .end(function(err, res){
            expect(err).to.eql(null);
            Recipe.find({recipeName:"puttest2"}, function(err, data){
              if (err) throw err;
              expect(data[0].recipeName).to.eql('puttest2');    
              Recipe.remove({_id: recID2}, function(err){
                if (err) throw err;
                done();
              });        
            })
        });
    });  
  });
});
describe("ingredients resource get/post", function(){
  it("should return ingredients on get", function(done){
    chai.request(url)
      .get("/recipes")
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });
});

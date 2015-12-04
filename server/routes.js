"use strict";

const Routes = require("express").Router(),
      getCurrentCity = require("./getCurrentCity");


    /**
     *  Defines the routes to our handlebars pages
     */
    Routes.get('/cali/:post', function(req, res, next) {
      let city = getCurrentCity(),
          post = req.params.post;
      res.render('index', {
        name:        post,
        pageType:    "post",
        pageTitle:   "whereisdave | "+post,
        templatePath: "posts/"+post,
        currentCity: {
          show: true,
          isFlying: city.isFlying,
          name: city.city
        }
      });
    });

    //  cali will re-direct back to splash
    Routes.get('/cali/', function(req, res) {
      res.redirect("/")
    });
    //  splash/index page
    Routes.get('/', function(req, res) {
      let city = getCurrentCity();
      res.render('index', {
        pageType:    "splash",
        pageTitle:   "whereisdave",
        currentCity: {
          show: false,
          isFlying: city.isFlying,
          name: city.city
        }
      });
    });

    module.exports = Routes;

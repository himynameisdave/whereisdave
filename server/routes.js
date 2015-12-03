"use strict";

const Routes = require("express").Router(),
      getCurrentCity = require("./getCurrentCity");


    /**
     *  Defines the routes to our handlebars pages
     */
    Routes.get('/cali/:post', function(req, res, next) {
      let post = req.params.post;
      res.render('index', {
        pageType:    "post",
        pageTitle:   "whereisdave | "+post,
        templatePath: "posts/"+post,
        currentCity: {
          show: true,
          city: getCurrentCity()
        }
      });
    });

    //  cali will re-direct back to splash
    Routes.get('/cali/', function(req, res) {
      res.redirect("/")
    });
    //  splash/index page
    Routes.get('/', function(req, res) {
      res.render('index', {
        pageType:    "splash",
        pageTitle:   "whereisdave",
        currentCity: {
          show: false,
          city: getCurrentCity()
        }
      });
    });

    module.exports = Routes;

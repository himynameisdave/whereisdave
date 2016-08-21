"use strict";

const Routes = require("express").Router()
const getCurrentCity = require("./getCurrentCity");

const _navItems = {
  cali: [
    {
      href: '/cali/day-one',
      displayName: 'Day One'
    },{
      href: '/cali/day-two',
      displayName: 'Day Two - Sick Day'
    },{
      href: '/cali/day-three',
      displayName: 'Day Three'
    },{
      href: '/cali/day-four',
      displayName: 'Day Four'
    },{
      href: '/cali/day-five',
      displayName: 'Day Five'
    },{
      href: '/cali/day-six',
      displayName: 'Day Six'
    },{
      href: '/cali/day-seven',
      displayName: 'Day Seven'
    },{
      href: '/cali/day-eight',
      displayName: 'Day Eight'
    },{
      href: '/cali/day-nine',
      displayName: 'Day Nine'
    }
  ],
  nyc: [
    {
      href: '/nyc/day-one',
      displayName: '01 - '
    }
  ]
};

const navItems = [
        {
          href: '/cali/day-one',
          displayName: 'Day One'
        },{
          href: '/cali/day-two',
          displayName: 'Day Two - Sick Day'
        },{
          href: '/cali/day-three',
          displayName: 'Day Three'
        },{
          href: '/cali/day-four',
          displayName: 'Day Four'
        },{
          href: '/cali/day-five',
          displayName: 'Day Five'
        },{
          href: '/cali/day-six',
          displayName: 'Day Six'
        },{
          href: '/cali/day-seven',
          displayName: 'Day Seven'
        },{
          href: '/cali/day-eight',
          displayName: 'Day Eight'
        },{
          href: '/cali/day-nine',
          displayName: 'Day Nine'
        }
      ];


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
        navItems: navItems,
        templatePath: "posts/"+post,
        currentCity: {
          show: true,
          isFlying: city.isFlying,
          name: city.city
        }
      });
    });

    //  /cali will now re-direct back to splash
    Routes.get('/cali/', function(req, res) {
      res.redirect("/cali/day-one")
    });

    //  /nyc will re-direct back to splash
    Routes.get('/nyc/', function(req, res) {
      res.redirect("/")
    });

    //  splash/index page
    Routes.get('/about', function(req, res) {
      let city = getCurrentCity();
      res.render('index', {
        pageType:    "about",
        pageTitle:   "whereisdave | about",
        navItems: navItems,
        currentCity: {
          show: true,
          isFlying: city.isFlying,
          name: city.city
        }
      });
    });

    //  splash/index page
    Routes.get('/', function(req, res) {
      let city = getCurrentCity();
      res.render('index', {
        pageType:    "splash",
        pageTitle:   "whereisdave",
        navItems: navItems,
        currentCity: {
          show: false,
          isFlying: city.isFlying,
          name: city.city
        }
      });
    });

    module.exports = Routes;

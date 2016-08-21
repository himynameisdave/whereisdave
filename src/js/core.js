"use strict";

$(document).ready(function(){


  $('.button-collapse').on("click", function(e){ e.preventDefault(); console.log("HEYYO") })

  $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );
   // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  // $('.collapsible').collapsible();
  $('.materialboxed').materialbox();

});

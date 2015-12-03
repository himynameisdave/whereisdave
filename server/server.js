var fs                = require("fs"),
    express           = require("express"),
    cons              = require("consolidate"),
    handlebars        = require("handlebars"),
    find              = require( "findit"),
    routes            = require("./routes.js")
    getCurrentCity    = require("./getCurrentCity"),
    port              = process.env.PORT || 6969,
    app               = express();


//  Adds a little equality handlebars helper
handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

//  Sets up the handlebars rendering
app.engine( "html.handlebars", cons.handlebars );
app.set( "view engine", "html.handlebars" );
//  Point the server to our views
app.set( "views", "./public/templates" );



//  Register Partials
var partials = "./public/templates/partials",
    finderPartials = find( partials );

finderPartials.on( "file", function( file, stat ) {
  var source  = fs.readFileSync( file, "utf8" ),
      split   = file.split( "/" ),
      partial = split[split.length-2] + "/" + split[split.length-1].replace( partials, "" ).replace( "/", "" ).split( "." )[0].replace( " ", "" );
  handlebars.registerPartial( partial, source );
});

//  Register Posts
var postTemplates = "./public/templates/posts",
    postPartials = find( postTemplates );

postPartials.on( "file", function( file, stat ) {
  var source  = fs.readFileSync( file, "utf8" ),
      split   = file.split( "/" ),
      partial = split[split.length-2] + "/" + split[split.length-1].replace( postTemplates, "" ).replace( "/", "" ).split( "." )[0].replace( " ", "" );
  handlebars.registerPartial( partial, source );
});




//  Set our port
app.set('port', port)
//  Run the static server
app.use( express.static("./public") );
//  Use our juicy routes
app.use( '/', routes );;
app.use(function( req, res, next ){
  res.status(404);
  res.redirect("/");
  return;
});


//  Listen on the specified port
app.listen( port, function(){
  console.log("App is running at localhost:"+port);
});

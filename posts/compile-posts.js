"use strict";

const fs       = require("fs");
const marked   = require("marked");
const renderer = new marked.Renderer();
const rawPath  = "./raw/";
const readMd   = ( file ) => {
  return new Promise((res, rej) => {
    fs.readFile( file, "utf8", (err, markdownPost) => {
      if(err) rej(err);
      res(markdownPost);
    })
  });
}
const writeHandlebars = (data, filename) => {
  let hbsFilename = filename.split('.md')[0]+".html.handlebars";
  return new Promise((res, rej)=>{
    fs.writeFile( "./compiled/"+hbsFilename, data, "utf8", (err)=>{
      if(err) rej(err);
      res("Wrote "+hbsFilename+" successfully!");
    });
  });
}

//  Loop through the raw folder
fs.readdir(rawPath, (err, files) => {
  if(err) throw err;
  //  for each markdown file
  files.forEach( (file) => {
    //  first read it
    readMd( rawPath+file )
      //  then parse it from markdown
      .then((rawData)=>{
        return marked(rawData);
      })
      //  then write the converted data to a handlebars file
      .then((mdData)=>{
        writeHandlebars(mdData, file)
          .then(console.log)
          .catch((e)=>{
            console.warn(e);
          });
      })
      .catch((e)=>{
        console.warn(e);
      });
  });
});



/*
var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + '><a name="' +
                escapedText +
                 '" class="anchor" href="#' +
                 escapedText +
                 '"><span class="header-link"></span></a>' +
                  text + '</h' + level + '>';
},

console.log(marked('# heading+', { renderer: renderer }));
*/

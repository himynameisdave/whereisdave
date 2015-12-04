"use strict";
const fs       = require("fs"),
      marked   = require("marked"),
      rawPath  = "./posts/raw/",
      readMd   = ( file ) => {
        return new Promise((res, rej) => {
          fs.readFile( file, "utf8", (err, markdownPost) => {
            if(err) rej(err);
            res(markdownPost);
          })
        });
      },
      writeHandlebars = (data, filename) => {
        let hbsFilename = filename.split('.md')[0]+".html.handlebars";
        return new Promise((res, rej)=>{
          fs.writeFile( "./posts/compiled/"+hbsFilename, data, "utf8", (err)=>{
            if(err) rej(err);
            res("Wrote "+hbsFilename+" successfully!");
          });
        });
      };


//    Set up how we want things to be rendered:
let renderer = new marked.Renderer();
    //  how to display headers
    renderer.heading = ( text, level ) => {
      let centerClass = level === 1 ? ' center' : ' ';
      return '<h'+level+' class="header thin'+centerClass+'black-text">'+text+'</h'+level+'>';
    };
    //  how to display paragraphs
    renderer.paragraph = (text) => {
      return '<p class="flow-text">'+text+'</p>';
    };
    //  how to display images
    renderer.image = (href, title, text) => {
      let dataCaption = text !== '' ? ' data-caption="'+text+'"' : '';
      return '<img class="responsive-img materialboxed" alt="'+text+'" src="'+href+'"'+dataCaption+' />'
    };
    //  how to render links
    renderer.link = (href, title, text) => {
      return '<a href="'+href+'" class="neato-link">'+text+'</a>';
    };





//  Loop through the raw folder
fs.readdir(rawPath, (err, files) => {
  if(err) throw err;
  //  for each markdown file
  files.forEach( (file) => {
    //  first read it
    readMd( rawPath+file )
      //  then parse it from markdown
      .then((rawData)=>{
        return marked(rawData, { renderer: renderer });
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

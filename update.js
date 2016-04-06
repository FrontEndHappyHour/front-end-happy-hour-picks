'use strict';
const request = require('request');
const fs = require('fs');
const url = 'https://raw.githubusercontent.com/FrontEndHappyHour/website/master/content/episodes.json';
const outputFile = './README.md';
const top = '# Front End Happy Hour Picks\nEach episode of the [Front End Happy Hour](http://frontendhappyhour.com) podcast our panelists share interesting picks.';
let output = top;
request({
    url: url,
    json: true
}, function (error, response, data) {
  if (!error && response.statusCode === 200) {
    for(let i = 0; i < data.length; i++) {
      const title = data[i].title;
      const episode = data[i].episode;
      const published = data[i].published;
      const picks = data[i].picks;

      output += (
        `

        ## Episode ${episode} - ${title}
        Published: ${published}

        `
      );

      for(let a = 0; a < picks.length; a++){
        const pickTitle = picks[a].title;
        const pickUrl = picks[a].url;
        const pickFrom = picks[a].from;

         output += (
          `- [${pickTitle}](${pickUrl}) - ${pickFrom}

          `
        );
      }
    }

    // create updated readme
    fs.writeFile(outputFile, output, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Updated ' + outputFile);
      }
    });
  }
})
'use strict';
const request = require('request');
const fs = require('fs');
const jsonfile = require('jsonfile');
const url = 'https://raw.githubusercontent.com/FrontEndHappyHour/website/master/content/episodes.json';
const outputFile = './README.md';
const top = '# Front End Happy Hour Picks\nEach episode of the [Front End Happy Hour](http://frontendhappyhour.com) podcast our panelists share interesting picks.';
const list = [];
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
      const pickList = [];
      output += (`\n\n## Episode ${episode} - ${title}\nPublished: ${published}\n`);

      for(let a = 0; a < picks.length; a++){
        const pickTitle = picks[a].title;
        const pickUrl = picks[a].url;
        const pickFrom = picks[a].from;

         output += (`- [${pickTitle}](${pickUrl}) - ${pickFrom}\n`);
         pickList.push({'title': pickTitle, 'url': pickUrl, 'from': pickFrom});
      }

      // update list for JSON file
      list.push({'episode': `${episode} - ${title}`, 'published': published, 'picks': pickList});
    }

    // create updated readme
    fs.writeFile(outputFile, output, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Updated ' + outputFile);
      }
    });
    console.log(list);
    // create JSON of picks
    jsonfile.writeFile('./list.json', list, {spaces: 2}, function(err) {
      if(err) {
        console.log(err);
      }else {
        console.log(`Updated list.json`);
      }
    });
  }
})
var request = require('request');
var fs = require('fs');
var url = 'https://raw.githubusercontent.com/FrontEndHappyHour/website/master/content/episodes.json';
var outputFile = './README.md';
var top = '# Front End Happy Hour Picks\nEach episode of the [Front End Happy Hour](http://frontendhappyhour.com) podcast our panelists share interesting picks.';
var output = top;
request({
    url: url,
    json: true
}, function (error, response, data) {
  if (!error && response.statusCode === 200) {
    for(var i = 0; i < data.length; i++) {
      var title = data[i].title;
      var episode = data[i].episode;
      var published = data[i].published;
      var picks = data[i].picks;

      output += '\n\n## Episode ' + episode + ' - ' + title + '\n';
      output += 'Published: ' + published + '\n';

      for(var a = 0; a < picks.length; a++){
        var pickTitle = picks[a].title;
        var pickUrl = picks[a].url;
        var pickFrom = picks[a].from;

        output += '- [' + pickTitle + '](' + pickUrl + ') - ' + pickFrom + '\n'; 
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
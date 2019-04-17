const express = require("express")
const fs = require('fs');
const JSONStream = require('JSONStream');

let app = express()
let turf = require("@turf/turf")
let InnerLineString = require("./controllers/InnerLineString");


app.use(express.static('public'))
app.use(express.json());

var sample_denver = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -105.06016373634338,
          39.61437523220512
        ],
        [
          -105.05883872509003,
          39.61437523220512
        ],
        [
          -105.05883872509003,
          39.61444961711276
        ],
        [
          -105.06016373634338,
          39.61444961711276
        ],
        [
          -105.06016373634338,
          39.61437523220512
        ]
      ]
    ]
  }
}

app.get('/getbbox', (req, res) => {
  var stream = fs.createReadStream('./backend/sample.geojson', { encoding: 'utf8' });
  // reference : https://www.npmjs.com/package/JSONStream
  var parser = JSONStream.parse(["features"]); // filter features only 
  stream.pipe(parser);
  var linestring;
  // ref: https://www.tutorialspoint.com/nodejs/nodejs_streams.htm
  parser.on('data', function (featuresArray) {
    linestring = InnerLineString.getLineString(sample_denver, featuresArray);
  });
  parser.on('end', function () {
    if (linestring == undefined) {
      res.send("no line intersection");
    } else {
      res.send(linestring);
    }
    stream.close();
  });
  parser.on("error", function () {
    console.error(err.stack);
    res.send("error occurred");
    stream.close();
  });

});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

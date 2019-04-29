const express = require("express")
const fs = require('fs');
const JSONStream = require('JSONStream');

let app = express()
let turf = require("@turf/turf")
let InnerLineString = require("./controllers/InnerLineString");
require("babel-core/register");
if (!global._babelPolyfill) {
  require('babel-polyfill');
}


app.use(express.static('public'))
app.use(express.json());

var sample = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      []
    ]
  }
}


app.get('/getbbox', (req, res) => {
  var stream = fs.createReadStream('./backend/sample.geojson', { encoding: 'utf8' });
  // reference : https://www.npmjs.com/package/JSONStream
  var parser = JSONStream.parse(["features"]); // filter features only 
  stream.pipe(parser);
  var linestring;
  console.error(req.query.point1);
  let query = [[JSON.parse(req.query.point1), JSON.parse(req.query.point2)]]
  sample.geometry.coordinates = query
  // ref: https://www.tutorialspoint.com/nodejs/nodejs_streams.htm
  parser.on('data', function (featuresArray) {
    linestring = InnerLineString.getLineString(sample, featuresArray);
  });
  
  parser.on('end', function () {
    if (linestring == undefined) {
      let data = {
        "res" : "no line intersection"
      }
      res.send(data);
    } else {
      let data =  {
        "res" : linestring
      }
      res.send(data);
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

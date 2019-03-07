const express = require("express")
let  app = express()
let turf = require("@turf/turf")
let lineInBox = require("./controllers/LineInBBox");


app.use(express.static('public'))
 
app.get('/', (req, res) => res.render("index"));

app.get('/home', (req, res) => {
    res.send("this is home page");
});

app.get('/getbbox', (req,  res) => {
    //TODO: get a bounding box
    // send back the lines that are within that bbox
    var polygon = turf.polygon(
        [
            [
              [
                -122.3069179058075,
                47.6684291751558
              ],
              [
                -122.30514764785767,
                47.6684291751558
              ],
              [
                -122.30514764785767,
                47.6693106192181
              ],
              [
                -122.3069179058075,
                47.6693106192181
              ],
              [
                -122.3069179058075,
                47.6684291751558
              ]
            ]
        ]
    );

    var polygon2 = turf.polygon( [
        [
          [
            -122.30810880661012,
            47.669007172942486
          ],
          [
            -122.30654239654541,
            47.669007172942486
          ],
          [
            -122.30654239654541,
            47.66987415762073
          ],
          [
            -122.30810880661012,
            47.66987415762073
          ],
          [
            -122.30810880661012,
            47.669007172942486
          ]
        ]
      ]);
    var line = turf.lineString([
        [
          -122.30550169944763,
          47.66928894454263
        ],
        [
          -122.30557680130005,
          47.66495382852193
        ],
        [
          -122.30644583702086,
          47.66494660302801
        ],
        [
          -122.30643510818481,
          47.669144446476174
        ],
        [
          -122.30554461479187,
          47.66928171964881
        ]
      ]);
    var data = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  -122.30550169944763,
                  47.66928894454263
                ],
                [
                  -122.30557680130005,
                  47.66495382852193
                ],
                [
                  -122.30644583702086,
                  47.66494660302801
                ],
                [
                  -122.30643510818481,
                  47.669144446476174
                ],
                [
                  -122.30554461479187,
                  47.66928171964881
                ]
              ]
            }
          }
        ]
    };

    // //console.log(data.features[0].geometry.coordinates);
    // let points = null;
    // //let coords = data.features[0].geometry.coordinates.map( x => parseFloat(x));
    // var coords = turf.points(data.features[0].geometry.coordinates) 
    // //console.log(coords)
    // points = turf.pointsWithinPolygon(coords, polygon);
        
    // let intersect = turf.intersect(polygon,turf.lineToPolygon(line));
    // console.log(intersect.geometry.coordinates);
    // console.log(points.features[0].geometry.coordinates);
    // res.send("hello");

    // console.log(data.features[0]);
});
app.listen(3000,  () => console.log("Example app listening on port 3000!"));

const express = require("express")
let  app = express()
let turf = require("@turf/turf")
let lineInBox = require("./controllers/InsideLineString");


app.use(express.static('public'))
 
app.get('/', (req, res) => res.render("index"));

app.get('/home', (req, res) => {
    res.send("this is home page");
});

app.get('/getbbox', (req,  res) => {
    //TODO: get a bounding box
    // send back the lines that are within that bbox

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
                -122.30985224246979,
                47.67761496987505
              ],
              [
                -122.3077118396759,
                47.67764025296123
              ],
              [
                -122.30767965316772,
                47.675845123395696
              ],
              [
                -122.30981469154358,
                47.67582706342832
              ],
              [
                -122.30985760688782,
                47.677636641092555
              ]
            ]
          }
        }
      ]
    }

    var outside = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -122.30938017368317,
              47.67784612906428
            ],
            [
              -122.30838239192961,
              47.67784612906428
            ],
            [
              -122.30838239192961,
              47.678420410742426
            ],
            [
              -122.30938017368317,
              47.678420410742426
            ],
            [
              -122.30938017368317,
              47.67784612906428
            ]
          ]
        ]
      }
    }

    var half = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -122.30825364589691,
              47.676740889933065
            ],
            [
              -122.30724513530731,
              47.676740889933065
            ],
            [
              -122.30724513530731,
              47.67722127452346
            ],
            [
              -122.30825364589691,
              47.67722127452346
            ],
            [
              -122.30825364589691,
              47.676740889933065
            ]
          ]
        ]
      }
    }
    var inside = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -122.3103404045105,
              47.675664523440744
            ],
            [
              -122.30692863464354,
              47.675664523440744
            ],
            [
              -122.30692863464354,
              47.67779556307916
            ],
            [
              -122.3103404045105,
              47.67779556307916
            ],
            [
              -122.3103404045105,
              47.675664523440744
            ]
          ]
        ]
      }
    }
    
   
    console.log("line");
    console.log(lineInBox.getLineString(inside, data.features[0]).geometry.coordinates);

    console.log("----------------------------------")
    res.send("hello");

});
app.listen(3000,  () => console.log("Example app listening on port 3000!"));

const express = require("express")
const fs = require('fs');
const JSONStream = require('JSONStream');

let  app = express()
let turf = require("@turf/turf")
let lineInBox = require("./controllers/InnerLineString");


app.use(express.static('public'))
app.use(express.json());

// app.get('/', (req, res) => res.render("index"));

// app.get('/home', (req, res) => {
//     res.send("this is home page");
// });

var lineString = {
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

var multilineString = {
  "type": "FeatureCollection",
  "name": "sidewalks",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
      { "type": "Feature", "properties": { "CREATEDATE": "2015\/11\/01", "CREATEUSER": "Kucera", "NOTES": null, "ROUTABLE": "Yes", "DETACHED": "No", "SURFACE": "CONCRETE", "DENVER": "Yes", "SIDEWALKTY": "Sidewalk", "CROSSINGTY": null, "ADJACENTRO": "Local", "LAST_EDITE": null, "LAST_EDI_1": null, "EDITSOURCE": null, "Z_LEV": null }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -105.064505124458719, 39.615026433418052 ], [ -105.064472132338778, 39.615004994340097 ] ] ] } },
      { "type": "Feature", "properties": { "CREATEDATE": "2015\/11\/01", "CREATEUSER": "Kucera", "NOTES": null, "ROUTABLE": "Yes", "DETACHED": "Yes", "SURFACE": "CONCRETE", "DENVER": "Yes", "SIDEWALKTY": "Sidewalk", "CROSSINGTY": null, "ADJACENTRO": "Local", "LAST_EDITE": null, "LAST_EDI_1": null, "EDITSOURCE": null, "Z_LEV": null }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -105.064758817381005, 39.615040105467756 ], [ -105.064801731537045, 39.615013087369505 ], [ -105.064852608721992, 39.614984373265145 ], [ -105.06493046000503, 39.614938350097816 ], [ -105.065010764296972, 39.614891902928946 ], [ -105.065050611441791, 39.614867836841483 ], [ -105.065083701562116, 39.614853048787722 ], [ -105.065136991755821, 39.614838233733849 ], [ -105.065180467913876, 39.614831857710669 ], [ -105.065231897100887, 39.614827157693583 ], [ -105.065296779336734, 39.614827916696356 ], [ -105.065367175592655, 39.614826982692932 ], [ -105.065435730841898, 39.614827736695702 ], [ -105.065542237229067, 39.614827598695172 ], [ -105.065642624594034, 39.614827047693211 ], [ -105.0657938211437, 39.61482600868942 ], [ -105.065938887671109, 39.61482708669331 ], [ -105.066078454178466, 39.614825641688071 ], [ -105.066262087846042, 39.614824979685693 ], [ -105.066386961300054, 39.614824396683559 ], [ -105.066573653978764, 39.614824574684178 ], [ -105.066738313577332, 39.614824359683439 ], [ -105.066932967285027, 39.614824105682487 ], [ -105.067107417919203, 39.61482430068321 ], [ -105.067301462624641, 39.614822360676158 ], [ -105.067415315038545, 39.614822632677146 ], [ -105.067583037648319, 39.614821148671751 ] ] ] } }

  ]};

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

var denver =  {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -104.98357057571411,
          39.74331277632636
        ],
        [
          -104.98233675956726,
          39.74331277632636
        ],
        [
          -104.98233675956726,
          39.74482243267714
        ],
        [
          -104.98357057571411,
          39.74482243267714
        ],
        [
          -104.98357057571411,
          39.74331277632636
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

var fromSample = { "type": "Feature", "properties": { "CREATEDATE": "2015\/11\/01", "CREATEUSER": "Kucera", "NOTES": null, "ROUTABLE": "Yes", "DETACHED": "Yes", "SURFACE": "CONCRETE", "DENVER": "Yes", "SIDEWALKTY": "Sidewalk", "CROSSINGTY": null, "ADJACENTRO": "Local", "LAST_EDITE": null, "LAST_EDI_1": null, "EDITSOURCE": null, "Z_LEV": null }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -105.064739459310658, 39.615015417378004 ], [ -105.064758817381005, 39.615040105467756 ] ] ] } };
var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);

app.get('/getbbox', (req, res) => {
    //TODO: get a bounding box
    // send back the lines that are within that bbox

    var stream = fs.createReadStream('sidewalks.geojson',{encoding: 'utf8'});
    var parser = JSONStream.parse(["features"]);
    stream.pipe(parser);
    var lines = [];
    parser.on('data', function(data){
      data.map( feature => {
       
        var lineWithin = lineInBox.getLineString(turf.bbox(denver), feature);
        if (lineWithin !== undefined){
          lines.push(lineWithin);
        }
      });
      res.send(lines)
    });
    console.log("--------------end------------------")
});
app.listen(3000,  () => console.log("Example app listening on port 3000!"));

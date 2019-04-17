import * as turf from "@turf/turf";


/*
     This Javascript file is to get a LineString within
     a bounding box from a given Array of MultiLineString features
     
     Arguments.
          + bbox: a polygon in GeoJSON format
          + featureArray:  an array of MultiLineString features
     
     Returns:
          + LineString feature if find a interect LineString of the featureArray
          and the bbox
          + undefined if cannot find a LineString
     
     Pre-condition: 
          + bbox must be a polygon
          + featureArray is defined
*/

var getLineString = function (bbox, featuresArray) {
     var pointsCollection; // FeatureColection of Points 
     var coords = [];  // array of coordinates
     var linestring = undefined;  // intersection line
     for (var i = 0; i < featuresArray.length; i++) {
          pointsCollection = turf.lineIntersect(featuresArray[i], bbox);
          // need at least two points to draw a lineString
          if (pointsCollection.features.length >= 2) {
               // extract coordinate from each point and save it in "coords" array
               pointsCollection.features.forEach(feature => {
                    coords.push(feature.geometry.coordinates);
               });
               // create LineString and copy properties over
               linestring = turf.lineString(coords);
               linestring.properties = featuresArray[i].properties;
               break; // only one line interection returned
          }
     }
     return linestring;
}


export { getLineString };
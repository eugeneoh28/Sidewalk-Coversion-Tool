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
               break;
          }
     }
     return linestring;
}


export {getLineString};

// //return intersections points between a line and a polygon
// // return type: FeatureCollection of Point
// var intersect = function( polygon, multiLine){
//      var polyToLine = turf.polygonToLine(polygon);
//      var points = turf.lineIntersect(multiLine, polyToLine);
//      return points;
// }

// //return the points of coordinates which are inside a polygon
// //return type: FeatureCollection of Point 
// var pointsWithinPolygon = function ( polygon, multiLine){
//      let points = [];
//      if (multiLine.geometry.type == "LineString"){
//           points = multiLine.geometry.coordinates;
//      } else if (multiLine.geometry.type == "MultiLineString"){
//           multiLine.geometry.coordinates.map( lineStringCoords => {
//           points = points.concat(lineStringCoords);
//           });
//      }
//      return turf.pointsWithinPolygon( turf.points(points), polygon);
// }

// //combine two Featurecollections of Point into MultiPoint
// //return type: FeatureCollection of Point
// var combine = function ( points1, points2){
//      var fc = turf.featureCollection(points1.features.concat(points2.features));
//      return fc;
// }

// //return LineString that is on or within bounding box
// var getLineString = function(bbox, multiLine){
//      let polygon = turf.bboxPolygon(bbox);
//      let intersectPoints = intersect( polygon, multiLine);
//      let pointsWithinPoly = pointsWithinPolygon( polygon, multiLine);
//      let pointsCollection = combine( intersectPoints, pointsWithinPoly);

//      // array of coordinates that are inside bbox
//      let coords= [];

//      // extract coordinate only from each point and save it int "coords" array
//      pointsCollection.features.forEach(feature => {
//           coords.push(feature.geometry.coordinates);
//      });

//      // a lineString must have at least two coordinates
//      if (coords.length >= 2){
//           return turf.lineString(coords);
//      }else {
//           return undefined;
//      }
// }


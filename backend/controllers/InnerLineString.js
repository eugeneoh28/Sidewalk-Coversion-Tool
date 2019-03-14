import * as turf from "@turf/turf";


/*
     This Javascript file is to get a LineString within
     a bounding box from a given LineString.

     It takes in a BBox and a FeatureCollection of  LineString. Then, it 
     identifies any points intersection points between these objects and
     any points on LineString that is within the BBox.
     Combining the points just found to have a LineString.
*/


//return intersections points between a line and a polygon
// return type: FeatureCollection of Point
var intersect = function( polygon, multiLine){
     var polyToLine = turf.polygonToLine(polygon);
     var points = turf.lineIntersect(multiLine, polyToLine);
     return points;
}

//return the points of coordinates which are inside a polygon
//return type: FeatureCollection of Point 
var pointsWithinPolygon = function ( polygon, multiLine){
     let points = [];
     if (multiLine.geometry.type == "LineString"){
          points = multiLine.geometry.coordinates;
     } else if (multiLine.geometry.type == "MultiLineString"){
          multiLine.geometry.coordinates.map( lineStringCoords => {
          points = points.concat(lineStringCoords);
          });
     }
     return turf.pointsWithinPolygon( turf.points(points), polygon);
}

//combine two Featurecollections of Point into MultiPoint
//return type: FeatureCollection of Point
var combine = function ( points1, points2){
     var fc = turf.featureCollection(points1.features.concat(points2.features));
     return fc;
}

//return LineString that is on or within bounding box
var getLineString = function(bbox, multiLine){
     let polygon = turf.bboxPolygon(bbox);
     let intersectPoints = intersect( polygon, multiLine);
     let pointsWithinPoly = pointsWithinPolygon( polygon, multiLine);
     let pointsCollecion = combine( intersectPoints, pointsWithinPoly);

     // array of coordinates that are inside bbox
     let coords= [];
     
     // extract coordinate only from each point and save it int "coords" array
     pointsCollecion.features.forEach(feature => {
          coords.push(feature.geometry.coordinates);
     });

     // a lineString must have at least two coordinates
     if (coords.length >= 2){
          return turf.lineString(coords);
     }else {
          return undefined;
     }
}

export {getLineString, intersect, pointsWithinPolygon,combine};
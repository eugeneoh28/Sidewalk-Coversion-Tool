import * as turf from "@turf/turf";
import { feature } from "@turf/turf";



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
    let points = turf.points(multiLine.geometry.coordinates);
    return turf.pointsWithinPolygon( points, polygon);
}

//combine two Featurecollections of Point into MultiPoint
//return type: FeatureCollection of Point
var combine = function ( points1, points2){
     var fc = turf.featureCollection(points1.features.concat(points2.features));
     return fc;
}

//return LineString that is on or within bounding box
var getLineString = function(polygon, multiLine){
     // let polygon = turf.bboxPolygon(bbox);
     let intersectPoints = intersect( polygon, multiLine);
     let pointsWithin = pointsWithinPolygon( polygon, multiLine);
     let pointsCollecion = combine( intersectPoints, pointsWithin);
     let points = [];
     pointsCollecion.features.forEach(feature => {
          points.push(feature.geometry.coordinates);
     });

     if (points.length >= 2){
          return turf.lineString(points);
     }else {
          return undefined;
     }
}

export {intersect, pointsWithinPolygon, combine, getLineString};
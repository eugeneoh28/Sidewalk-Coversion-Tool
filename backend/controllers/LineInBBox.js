import turf, { multiPoint } from "@turf/turf";



//return intersections points between a line and a polygon
var intersect = function( polygon, multiLine){
     var polyToLine = turf.polyToLine(polygon);
     var points = turf.lineIntersect(multiLine, polyToLine);
     return points;
}

//return the points of coordinates which are inside a polygon
var pointsWithinPolygon = function ( polygon, multiLine){
    let points = turf.points(multiLine.geometry.coordinates);
    return turf.pointsWithinPolygon( points, polygon);
}

//combine two Featurecollections of Point into MultiPoint
var combine = function ( points1, points2){
    var fc = turf.featureCollection(points1, points2);
    return turf.combine(fc);
}

//return LineString that is on or within bounding box
var getLineString = function(bbox, multiLine){
     let polygon = turf.bboxPolygon(bbox);
     let intersectPoints = intersect( polygon, multiLine);
     let pointsWithin = pointsWithinPolygon( polygon, multiLine);
     let multiPoint = combine( intersectPoints, pointsWithin);
     return turf.lineString(multiPoint.geometry.coordinates);
}

export {getLineString};
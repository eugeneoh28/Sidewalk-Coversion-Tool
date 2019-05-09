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

const sampleData = {
  "type": "FeatureCollection",
  "features": []
};

var getLineString = function (linebox, featuresArray) {
     var pointsCollection; // FeatureColection of Points 
     var coords = [];  // array of coordinates
     var linestring = undefined;  // intersection line
     var line = turf.lineString(linebox);
     var bbox = turf.bbox(line);
     var bboxPolygon = turf.bboxPolygon(bbox);
     sampleData.features = [];
     
     for (var i = 0; i < featuresArray.length; i++) {
          pointsCollection = turf.lineIntersect(featuresArray[i], bboxPolygon);
          let intersect = turf.intersect(bboxPolygon, featuresArray[i]);
          if (intersect != null) {
               sampleData.features.push(featuresArray[i])
          }
          
     }
     return sampleData;
}


export { getLineString };
//bingmap token: AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0 
//mapbox token: pk.eyJ1IjoicHRyYW44MTYiLCJhIjoiY2p1dTI3YTNnMDJveDN5bXFjMDd1MG92bCJ9.jSeVTjBT1A_wgh63ETE9Lg
import React, { Component } from "react";
import { render } from 'react-dom'
import L from 'leaflet'
import 'leaflet-draw'
import { EMLINK } from "constants";

class EditMapContainer extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      alert("hi");
    }
    componentDidUpdate(prevProps) {
        let prevCoord = prevProps.streetview;
        let currCoord = this.props.streetview;
        //check if any change in coordinate
        if (currCoord[0] !== prevCoord[0] || currCoord[1] !== prevCoord[1]) {
            this.sv_marker.setLatLng(currCoord)
        }

    }

  componentDidMount() {
    // create map
    this.map = L.map('editMap',{
      minZoom:15,
      maxZoom:20 // less than or equal 18, cannot be greater than 18
    }).setView(this.props.streetview, 20);

    // create base map layers and add them to map
    // reference: https://leafletjs.com/examples/layers-control/
    let streets = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>'
      });
    let satellite = L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHRyYW44MTYiLCJhIjoiY2p1dTI3YTNnMDJveDN5bXFjMDd1MG92bCJ9.jSeVTjBT1A_wgh63ETE9Lg'
    );
    var baseMaps = {
      "Streets": streets,
      "Satellite": satellite
    };
    // add base maps, overlays is null
    L.control.layers(baseMaps,null,{collapsed:false}).addTo(this.map);

    var editableLayer = this.props.layers
    this.map.addLayer(this.props.layers)

    this.sv_marker = new L.marker(this.props.streetview, {
      draggable: true,
      autoPan: true
    }).addTo(this.map)

    var drawPluginOptions = {
      position: 'topleft',
      draw: {
        polyline: true,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        marker: false,
        polygon: false,
        circlemarker: false
      },
  
      edit: {
        featureGroup: editableLayer, //REQUIRED!!
        remove: true
      }
    };

    this.sv_marker.on("drag", (e) => {
      let position = this.sv_marker.getLatLng()
      this.props.reFocusCallback(position["lat"], position["lng"])
    })
    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw(drawPluginOptions);
    this.map.addControl(drawControl);

    this.map.on('draw:created', (e) => {
      var type = e.layerType,
        layer = e.layer;
      if (type === 'marker') {
        layer.bindPopup('A popup!');
      }
      // reference for click event: https://github.com/Leaflet/Leaflet.draw/issues/179
      layer.on('click', (e) => {
        // ref: https://stackoverflow.com/questions/29000768/change-polyline-options-leaflet
        // reference to this https://github.com/Leaflet/Leaflet.draw/blob/master/src/draw/handler/Draw.Polyline.js#L20
        // to know which option of setStyle is available
        layer.setStyle({ color: 'blue'});
        layer.setStyle({opacity:1});
        this.handleClick(); // triggered when a line clicked
      });
      layer.type = "Feature";
      layer.properties = layer.properties || {};
      console.log(layer);
      editableLayer.addLayer(layer);
      this.props.updateLayerData(editableLayer);
      console.log(editableLayer)
    });
    // https://leafletjs.com/reference-1.4.0.html#layergroup
    drawPluginOptions.edit.featureGroup
    
    setTimeout(() => { this.map.invalidateSize(true) }, 100);

  }
  render() {
    return <div id="editMap"></div>
  }
}

export default EditMapContainer;
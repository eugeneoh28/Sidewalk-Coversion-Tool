//AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0 
import  React,{Component} from "react";
import { render } from 'react-dom'
import L from 'leaflet'
import'leaflet-draw'

class EditMapContainer extends Component {
    componentDidMount() {
        // create map
        this.map = L.map('editMap').setView(this.props.coord, 18);
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>'
          }).addTo(this.map);

        var editableLayer = this.props.layers
        this.map.addLayer(this.props.layers)

        var marker = new L.marker(this.props.coord, {
            draggable:true,
            autoPan:true
        }).addTo(this.map)

        var drawPluginOptions = {
          position: 'topleft',
          draw: {
            polyline: true,
            circle: false, // Turns off this drawing tool
            rectangle: false,
            marker: false,
            polygon: false,
            circlemarker:false
            },
          edit: {
            featureGroup: editableLayer, //REQUIRED!!
            remove: true
          }
        };

        marker.on("drag", (e) => {
            let position = marker.getLatLng()
            this.props.reFocus(position["lat"], position["lng"])
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
          editableLayer.addLayer(layer);
        });
        setTimeout(() => {this.map.invalidateSize(true)}, 100);

    }
  render() {
    return <div id="editMap"></div>
  }
}
export default EditMapContainer;
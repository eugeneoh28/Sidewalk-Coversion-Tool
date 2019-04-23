//mapbox token: pk.eyJ1IjoicHRyYW44MTYiLCJhIjoiY2p1dTI3YTNnMDJveDN5bXFjMDd1MG92bCJ9.jSeVTjBT1A_wgh63ETE9Lg

import React, { Component } from "react";
import { render } from 'react-dom'
import L from 'leaflet'
import mapboxgl from "mapbox-gl";
import 'leaflet-draw'

class SatelliteViewContainer extends Component {

    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoicHRyYW44MTYiLCJhIjoiY2p1dTI3YTNnMDJveDN5bXFjMDd1MG92bCJ9.jSeVTjBT1A_wgh63ETE9Lg';
        this.map = new mapboxgl.Map({
            container: 'satellite',
            zoom: 15,
            center: [-122.335167, 47.608013],
            style: 'mapbox://styles/mapbox/satellite-streets-v10'
        });
    }
    render() {
        return <div id="satellite"></div>
    }
}
export default SatelliteViewContainer;
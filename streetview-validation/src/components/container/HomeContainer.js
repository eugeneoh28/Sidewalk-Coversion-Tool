import React,{Component} from "react";
import L from "leaflet";
import "../../App.css"
import StreetViewContainer from "./StreetViewContainer";
import EditMapContainer from "./EditMapContainer"
import ValidationContainer from "./ValidationContainer";

class MainContainer extends Component {
    constructor(){
        super();
        this.state = {
                streetcoord: [47.604034,-122.33451],
                coord : [47.604034, -122.33451],
                layers: new L.FeatureGroup()
        };
    }

    onClick() {
        console.log(this.state.layers.toGeoJSON());
    }

    //update this.state
    reFocus(lat, long) {
        const currcoord = this.state.coord;
        const currlayers = this.state.layers;

        this.setState({
            streetcoord: [lat, long],
            coord: currcoord,
            currlayers: currlayers
        })
    }
    render(){
        return (
            <table className="main">
            <tbody>
                <tr>
                    <td colSpan="1">
                        <EditMapContainer layers={this.state.layers} coord={this.state.coord} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)}/>
                    </td>
                    <td><StreetViewContainer coord={this.state.streetcoord} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td> <ValidationContainer/> </td>
                </tr>
               
            </tbody>
            </table>
        );
    }
}
export default MainContainer;
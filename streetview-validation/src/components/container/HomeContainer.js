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
                // [ latitude, longitude]
                streetcoord: [47.604034,-122.33451],
                coord : [47.604034, -122.33451],
                layers: new L.FeatureGroup(),
                isNextClicked: false
        };

        this.onNextClicked = this.onNextClicked.bind(this);
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

    //set isNextClicked to true when "Next" button clicked
    onNextClicked(){
        this.setState({
            isNextClicked : true
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
                    {/** After "Next" button clicked, the button would be replace by ValidationContainer */}
                    <td> {(!this.state.isNextClicked) ? <button onClick={this.onNextClicked}> next </button>  : <ValidationContainer/> } </td>
                </tr>
               
            </tbody>
            </table>
        );
    }
}
export default MainContainer;
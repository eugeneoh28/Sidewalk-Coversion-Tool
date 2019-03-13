import React,{Component} from "react";
import L from "leaflet";
import "../../App.css"
import StreetViewContainer from "./StreetViewContainer";
import EditMapContainer from "./EditMapContainer"
import ValidationContainer from "./ValidationContainer";
import NavBar from "./NavBarContainer"

class MainContainer extends Component {
    constructor(){
        super();
        this.state = {
                // [ latitude, longitude]
                coord : [47.604034, -122.33451],
                layers: new L.FeatureGroup(),
                validation: false
        };

        this.onNextClicked = this.onNextClicked.bind(this);
    }

    //update this.state
    reFocus(lat, long) {
        const currcoord = this.state.coord;
        const currlayers = this.state.layers;

        this.setState({
            coord: [lat, long],
            currlayers: currlayers
        })
    }

    //set isNextClicked to true when "Next" button clicked
    onNextClicked(){
        console.log(this.state.layers.toGeoJSON());
        this.setState({
            validation : true
        })
    }

    render(){
        return (
            <div className="main">
                <NavBar onNextClicked={() => this.onNextClicked()}></NavBar>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <EditMapContainer layers={this.state.layers} coord={this.state.coord} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)}/>
                        </div>
                        <div className="col">
                            <StreetViewContainer coord={this.state.coord} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)} />
                        </div>
                        {/* * After "Next" button clicked, the button would be replace by ValidationContainer */}
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.validation ? <ValidationContainer/> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainContainer;
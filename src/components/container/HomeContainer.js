import React,{Component} from "react";
import L from "leaflet";
import "../../App.css"
import StreetViewContainer from "./StreetViewContainer";
import EditMapContainer from "./EditMapContainer"
import ValidationContainer from "./ValidationContainer";
import SatelliteViewContainer from "./SatteliteViewContainer"
import NavBar from "./NavBarContainer"

class MainContainer extends Component {
    constructor(){
        super();
        this.state = {
                // [ latitude, longitude]
                coord : [],
                lat: "",
                long: "",
                layers: new L.FeatureGroup(),
                validatedData : {},
                validation: false
        };

        this.onNextClicked = this.onNextClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLat = this.changeLat.bind(this);
        this.changeLong = this.changeLong.bind(this);

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
        this.setState({
            validatedData : this.state.layers.toGeoJSON(),
            validation : true
        })
    }

    updateData(data) {
        this.setState({
            validatedData: data
        })
        console.log(this.state.validatedData)
    }

    handleSubmit() {
        let lat = this.state.lat
        let long = this.state.long
        this.setState({
            coord : [lat, long]
        })
    }

    changeLat(e) {
        this.setState({
            lat: e.target.value
        })
    }

    changeLong(e) {
        this.setState({
            long: e.target.value
        })
    }

    render(){
        const map = (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <SatelliteViewContainer />
                        </div>
                        <div className="col">
                            <EditMapContainer layers={this.state.layers} coord={this.state.coord} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)}/>
                        </div>
                        <div className="col">
                            <StreetViewContainer coord={this.state.coord} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.validation ? <ValidationContainer data={this.state.validatedData} validateCallback={(data) => this.updateData(data)}/> : null}
                        </div>
                    </div>
                </div>
            )

        const setCoord = (
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                          <p>Lat:</p>
                          <textarea onChange={this.changeLat}/>
                          <p>Long:</p>
                          <textarea onChange={this.changeLong} />
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                      </form>
                </div>
            )

        return (
            <div className="main">
                <NavBar onNextClicked={() => this.onNextClicked()}></NavBar>
                {this.state.coord.length ? map : setCoord}
            </div>
        );
    }
}
export default MainContainer;
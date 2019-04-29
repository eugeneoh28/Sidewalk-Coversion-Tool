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
                coord : [],
                streetview: [],
                lat1: "",
                long1: "",
                layers: new L.FeatureGroup(),
                validatedData : {},
                validation: false
        };

        this.onNextClicked = this.onNextClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLat1 = this.changeLat1.bind(this);
        this.changeLong1 = this.changeLong1.bind(this);
        this.changeLat2 = this.changeLat2.bind(this);
        this.changeLong2 = this.changeLong2.bind(this);
    }

    //update this.state
    reFocus(lat, long) {
        const currcoord = this.state.streetview;
        const currlayers = this.state.layers;

        this.setState({
            streetview: [lat, long],
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

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("here");
        let lat1 = Number(this.state.lat1)
        let long1 = Number(this.state.long1)
        let lat2 = Number(this.state.lat2)
        let long2 = Number(this.state.long2)

        let point1 = String([lat1, long1])
        let point2 = String([lat2, long2])
        let q = "point1=[".concat(point1).concat("]").concat("&point2=[").concat(point2).concat("]")
        console.log('/getbbox'.concat(q));

        const response = await fetch('/getbbox?'.concat(q))
        const body = await response.json();

        if (response.status !== 200) throw Error (body.message)

        console.log(body)
        let midlat = (lat1 + lat2)/2
        let midlong = (long1 + long2)/2
        console.log(typeof(lat1))
        console.log(midlat)
        console.log(midlong)
        this.setState({
            coord : [[lat1, long1],[lat2, long2]],
            streetview: [midlat, midlong]
        })
    }

    changeLat1(e) {
        this.setState({
            lat1: e.target.value
        })
    }

    changeLong1(e) {
        this.setState({
            long1: e.target.value
        })
    }

    changeLat2(e) {
        this.setState({
            lat2: e.target.value
        })
    }

    changeLong2(e) {
        this.setState({
            long2: e.target.value
        })
    }

    render(){
        const map = (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <EditMapContainer layers={this.state.layers} streetview={this.state.streetview} coord={this.state.coord} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)}/>
                        </div>
                        <div className="col">
                            <StreetViewContainer streetview={this.state.streetview} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)} />
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
                          <p>Lat 1:</p>
                          <textarea onChange={this.changeLat1}/>
                          <p>Long 1:</p>
                          <textarea onChange={this.changeLong1} />
                        </label>
                        <label>
                          <p>Lat 2:</p>
                          <textarea onChange={this.changeLat2}/>
                          <p>Long 2:</p>
                          <textarea onChange={this.changeLong2} />
                        </label>
                        <br />
                        <button type="submit">Submit</button>
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
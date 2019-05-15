import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import L from "leaflet";
import StreetViewContainer from "./StreetViewContainer";
import EditMapContainer from "./EditMapContainer"
import ValidationContainer from "./ValidationContainer";
import NavBar from "./NavBarContainer"
import "../css/Home.css"

class MainContainer extends Component {
    constructor() {
        super();
        let nlayers = new L.FeatureGroup();
        this.state = {
                // [ latitude, longitude]
                coord : [],
                streetview: [],
                lat1: "",
                long1: "",
                layers: nlayers,
                validatedData : {},
                validation: false,
                highLightFeature: null,
                ids: [],
                id: null,
                finished: false
        };

        this.onNextClicked = this.onNextClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLat1 = this.changeLat1.bind(this);
        this.changeLong1 = this.changeLong1.bind(this);
        this.changeLat2 = this.changeLat2.bind(this);
        this.changeLong2 = this.changeLong2.bind(this);
        this.nextFeature = this.nextFeature.bind(this);
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

    nextFeature() {
        if (this.state.id == null && this.state.ids.length > 0) {
            this.setState({
                id: 0
            })
        } else if (this.state.id == this.state.ids.length-1) {
            this.setState({
                finished: true
            })
        } else {
            let previd = this.state.id;
            previd += 1;
            this.setState({
                id: previd
            })
        }
        console.log(this.state.id);
    }

    //set isNextClicked to true when "Next" button clicked
    onNextClicked() {
        let vData = this.state.layers.toGeoJSON()
        this.setState({
            validatedData: vData,
            validation: true
        })
        console.log(this.state.layers.toGeoJSON())
        console.log(this.state.validatedData)
    }

    updateLayerData(nlayers, layer) {
        console.log(layer)
        let id = nlayers.getLayerId(layer)
        console.log(layer)
        let ids = this.props.ids;
        ids.push(id);
        this.setState({
            layers: nlayers,
            ids: ids
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

        if (response.status !== 200) throw Error(body.message)

        let nlayers = this.state.layers;
        let ids = this.state.ids;
        console.log(body.res)
        let glayers = L.geoJson(body.res);
        console.log(glayers)
        glayers.eachLayer((l) => {
            console.log("here!")
             nlayers.addLayer(l);
             ids.push(nlayers.getLayerId(l));
        })
        console.log(ids);
        let midlat = (lat1 + lat2)/2
        let midlong = (long1 + long2)/2
        console.log(typeof(lat1))
        console.log(midlat)
        console.log(midlong)
        this.setState({
            coord : [[long1, lat1],[long2, lat2]],
            streetview: [midlong, midlat],
            layers : nlayers,
            ids:ids
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

    render() {
        const map = (
<<<<<<< HEAD
            <table className ="container">
                <tbody>
                    <tr>
                        <td>
                            <EditMapContainer id = {this.state.id} ids={this.state.ids} layers={this.state.layers} streetview={this.state.streetview} coord={this.state.coord} updateLayerData={(nlayers,layer) => this.updateLayerData(nlayers, layer)} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)}/>
                        </td>
                        <td>
                             <StreetViewContainer streetview={this.state.streetview} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" >
                            {this.state.validation ? <ValidationContainer data={this.state.validatedData} validateCallback={(data) => this.updateData(data)}/> : null}
                        </td>
                    </tr>
                </tbody>
            </table>
               
=======
            <Container className="container">
                <Row className="row">
                    <Col>
                        <EditMapContainer layers={this.state.layers} streetview={this.state.streetview} coord={this.state.coord} updateLayerData={(layers) => this.updateLayerData(layers)} reFocusCallback={(lat, lng) => this.reFocus(lat, lng)} />
                    </Col>
                    <Col>
                        <StreetViewContainer streetview={this.state.streetview} reFocusCallback={(lat, lng) => this.reFocus(lat, lng)} />
                    </Col>
                </Row>
                <Row className="row">
                    <Col>
                        {this.state.validation ? <ValidationContainer data={this.state.validatedData} validateCallback={(data) => this.updateData(data)} /> : null}
                    </Col>
                </Row>
            </Container>

>>>>>>> 0c516bffba86e61b12e85a38d62df5ff06ae677d
        )

        const setCoord = (
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                          <p>Long 1:</p>
                          <textarea onChange={this.changeLat1}/>
                          <p>Lat 1:</p>
                          <textarea onChange={this.changeLong1} />
                        </label>
                        <label>
                          <p>Long 2:</p>
                          <textarea onChange={this.changeLat2}/>
                          <p>Lat 2:</p>
                          <textarea onChange={this.changeLong2} />
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                      </form>
                </div>
            )

        return (
            <div className="main">
                <NavBar finished={this.state.finished} nextFeature={() => this.nextFeature()} onNextClicked={() => this.onNextClicked()}></NavBar>
                {this.state.coord.length ? map : setCoord}
            </div>
        );
    }
}
export default MainContainer;
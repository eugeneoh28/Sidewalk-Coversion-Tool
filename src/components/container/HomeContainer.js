import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import L from "leaflet";
import StreetViewContainer from "./StreetViewContainer";
import EditMapContainer from "./EditMapContainer"
import ValidationContainer from "./ValidationContainer";
import NavBar from "./NavBarContainer"
import "../css/Home.css"
import queryString from 'query-string';

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
                lat2: "",
                long2: "",
                layers: nlayers,
                validatedData : {},
                validation: false,
                highLightFeature: null,
                ids: [],
                id: null,
                finished: false,
                loaded: false
        };

        this.onNextClicked = this.onNextClicked.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        console.log("HERE")
        console.log(this.props)
        let parsed = queryString.parse(this.props.location.search);
        let p1 = JSON.parse(parsed.p1);
        let p2 = JSON.parse(parsed.p2);
        console.log(p1)
        console.log(p2)

        this.loadData(p1[0], p1[1], p2[0], p2[1])

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

    async loadData (lat1, long1, lat2, long2) {
        console.log("here");

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
            ids:ids,
            loaded: true
        })
    }
    render() {
        const map = (
            <Container className="container">
                <Row className="row">
                    <Col>
                        <EditMapContainer id = {this.state.id} ids={this.state.ids} layers={this.state.layers} streetview={this.state.streetview} coord={this.state.coord} updateLayerData={(nlayers,layer) => this.updateLayerData(nlayers, layer)} reFocusCallback={(lat, lng) => this.reFocus(lat,lng)} />
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
            )
        return (
            <div className="main">
                <NavBar finished={this.state.finished} nextFeature={() => this.nextFeature()} onNextClicked={() => this.onNextClicked()}></NavBar>
                {this.state.loaded ? map : null}
            </div>
        );
    }
}
export default MainContainer;
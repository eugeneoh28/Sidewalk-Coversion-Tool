//AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0 
import  React,{Component} from "react";
import "../css/StreetView.css"
class StreetViewContainer extends Component {
    constructor(props){
        super(props);
        this.state = {map : undefined};
    }

    componentDidMount() {
        let lat = this.props.streetview[0]
        let long = this.props.streetview[1]

        //GetMap is a callback that is called when the BingMap script sucessfully loaded
        // the map script is is /public/index.html
        window.GetMap = () => {
            //initialized Bing Map
            var map = new window.Microsoft.Maps.Map('#streetMap', {
                center: new window.Microsoft.Maps.Location(lat, long),
                mapTypeId: window.Microsoft.Maps.MapTypeId.streetside,
                streetsideOptions: {
                    locationToLookAt: new window.Microsoft.Maps.Location(lat, long),
                    //overviewMapMode: window.Microsoft.Maps.OverviewMapMode.hidden,
                    showHeadingCompass: true,
                    showExitButton: false
                }
            });

            window.Microsoft.Maps.Events.addHandler(map, 'viewchangeend', () => {
                var center = map.getCenter();
                this.props.reFocusCallback(center["latitude"], center["longitude"])
            })
            //update state
            this.setState ({map: map});
        }
    }

    componentDidUpdate(prevProps) {
        let prevCoord = prevProps.streetview;
        let currCoord = this.props.streetview;
        //check if any change in coordinate
        if (currCoord[0] !== prevCoord[0] || currCoord[1] !== prevCoord[1]) {
            let lat = currCoord[0]
            let long = currCoord[1]
            let location = new window.Microsoft.Maps.Location(lat, long);
            this.state.map.setView({ center: location });
        }
    }
       

    render() {
        return (
            <div id="streetMap"> </div>       
        );
    }
}
export default StreetViewContainer;
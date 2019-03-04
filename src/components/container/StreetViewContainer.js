//AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0 
import  React,{Component} from "react";

class StreetViewContainer extends Component {
    constructor(props){
        super(props);
        this.state = {map : undefined};
    }

    componentDidMount() {
        let lat = this.props.coord[0]
        let long = this.props.coord[1]

        //GetMap is a callback that is called when the BingMap script sucessfully loaded
        // the map script is is /public/index.html
        window.GetMap = () => {
            //initialized Bing Map
            var map = new window.Microsoft.Maps.Map('#streetMap', {
                center: new window.Microsoft.Maps.Location(lat, long),
                mapTypeId: window.Microsoft.Maps.MapTypeId.streetside,
                streetsideOptions: {
                    overviewMapMode: window.Microsoft.Maps.OverviewMapMode.hidden,
                    showExitButton: false
                }
            });
            //update state
            this.setState ({map: map});
        }
    }

    componentDidUpdate(prevProps) {
        let prevCoord = prevProps.coord;
        let currCoord = this.props.coord;
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
            <div id="streetMap" style={{position:"relative", width:"800px", height:"600px"}}> </div>
          
        );
    }
}
export default StreetViewContainer;
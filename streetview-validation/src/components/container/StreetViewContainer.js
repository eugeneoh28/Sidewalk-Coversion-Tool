//AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0 
import  React,{Component} from "react";
import {ReactBingmaps} from 'react-bingmaps'
class StreetViewContainer extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         map: undefined,
    //         error: undefined
    //     };
    //     //this.scriptUrl = "http://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0";
             
    //     this.loadScript = this.loadScript.bind(this);
    // }

    // loadScript() {
    //     let script = document.createElement("script");
    //     script.type = "text/javascipt";
    //     script.async = true;
    //     script.defer = true;
    //     script.src =   "http://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0";
    // }

    componentWillMount(){
        // this.loadScript();
        // window.getMap =  function () {
        //     this.setState(() => {
        //          map : new window.Microsoft.Maps.Map('#bingmap',{})
        //      });
        //  }
        // this.map = new window.Microsoft.Maps.Map("#bingmap", {
        //     credentials: "AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0",
        //     center: new window.Microsoft.Maps.Location(51.50632 , -0.12714),
        //     mapTypeId: window.Microsoft.Maps.MapTypeId.streetside
        // })
    }

    componentDidMount(){
        window.GetMap =  function () {
            var map = new window.Microsoft.Maps.Map('#myMap', {
                center: new window.Microsoft.Maps.Location(51.50632, -0.12714),
                mapTypeId: window.Microsoft.Maps.MapTypeId.streetside,
                //overviewMapMode : window.Microsoft.Maps.OverviewMapMode.hidden
                showZoomButtons : false,
                showHeadingCompass : false
            });
        }

        // this.map = new window.Microsoft.Maps.Map("#bingmap", {
        //     credentials: "AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0",
        //     center: new window.Microsoft.Maps.Location(51.50632 , -0.12714),
        //     mapTypeId: window.Microsoft.Maps.MapTypeId.streetside
        // })
    }

    

    render() {
        return (
            <div id="myMap" style={{position: 'relative',width: '600px',height: '400px'}}>
            </div>
            // <ReactBingmaps
            //     bingmapKey = "AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0"
            //     center={[47.604034, -122.33451]}
            //     mapTypeId = {"streetside"}
            // >
            // </ReactBingmaps>
        
        );
    }
}
export default StreetViewContainer;
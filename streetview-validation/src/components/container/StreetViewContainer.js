//AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0 
import  React,{Component} from "react";

class StreetViewContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            map: undefined,
            apikey : "AujBA0Eg9HhDkefJMk1QB-w08xgP3gmjc3uWtU1mU82JXZmQmPlJlWq14WjhIDV0",
            error: undefined
        };
        this.scriptUrl = "http://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=";
             
        this.loadScript = this.loadScript.bind(this);
    }

    loadScript(url) {
        let script = document.createElement("script");
        script.type = "text/javascipt";
        script.async = true;
        script.defer = true;
        script.src = url+this.state.apikey;
    }

    componentWillMount(){
        this.loadScript(this.scriptUrl);
       
    }

    componentDidMount(){
        window.getMap =  function () {
           this.setState(() => {
                map : new window.Microsoft.Maps.Map('#bingmap')
            });
        }
    }

    

    render() {
        return (
            <div id="bingmap" style={{position: 'relative',width: '600px',height: '400px'}}>
            </div>
        );
    }
}
export default StreetViewContainer;
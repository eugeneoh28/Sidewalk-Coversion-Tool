import React,{Component} from "react";
import StreetViewContainer from "./StreetViewContainer";
import EditMapContainer from "./EditMapContainer"

class MainContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
                coord : {x: null, y: null}
        };
        
    }
    render(){
        return (
            <table className="home-table">
                <tbody>
                    <tr>
                        <td> <EditMapContainer/> </td>
                        <td><StreetViewContainer/> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> validation </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
export default MainContainer;
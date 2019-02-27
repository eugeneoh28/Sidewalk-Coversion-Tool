import React,{Component} from "react";
import StreetViewContainer from "./StreetViewContainer";

class MainContainer extends Component {
    render(){
        return (
            <table className="home-table">
                <tbody>
                    <tr>
                        <td colSpan="1"> this is for map </td>
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
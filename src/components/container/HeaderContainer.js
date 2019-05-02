import React, { Component } from "react";
import { render } from 'react-dom'
import "../../App.css"

class HeaderContainer extends Component {
    render(){
        return (
            <div className="header">
                <h2>The Taskar Center for Accessible Technology</h2> 
                <h4>Sidewalk Validation</h4>
            </div>
        );
    }
}
export default HeaderContainer;
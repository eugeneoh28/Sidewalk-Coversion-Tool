import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
class NavBarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation : false,
            buttonText: "Next"
        }
    }

    next = () => {
        if (!this.state.validation) {
            this.props.onNextClicked();
            this.setState({
                validation: true,
                buttonText:"Next Feature"
            })
            this.props.nextFeature();
        } else if (!this.props.finished){
            this.props.nextFeature();
        } else {
            this.setState({
                buttonText:"Submit to OSM"
            })
        }
    };

    reset = () => {
        this.setState({
            finalStage: false,
            buttonText: "Next"
        })
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Sidewalk Validation Tool</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <Button onClick={this.reset}> Start New Validation</Button>
                        <Button onClick={this.next}> {this.state.buttonText}</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
        {/** 
        // return (
        //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //         <a className="navbar-brand" href="#"></a>
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav mr-auto">
        //             <li className="nav-item active">
        //                 <a className="nav-link" href="#"> Sidewalk Validation </a>
        //             </li>
        //         </ul>
        //         <ul className="navbar-nav ml-auto">
        //             <li className="nav-item">
        //                 <a className="nav-link" onClick={this.reset}> Start New Validation</a>
        //             </li>
        //             <li className="nav-item active">
        //                 <button onClick={this.next} className="btn btn-outline-success my-2 my-sm-0"> {this.state.buttonText} <span className="sr-only"></span></button>
        //             </li>
        //         </ul>
        //         </div>
        //         </nav>
        // );*/}
    }
}
export default NavBarContainer;
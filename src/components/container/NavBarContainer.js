import  React,{Component} from "react";

class NavBarContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            finalStage : false,
            buttonText: "Next"
        }
    }

    next = () => {
        this.props.onNextClicked();
        this.setState({
            finalStage: true,
            buttonText:"Submit to OSM"
        })
    };

    reset = () => {
        this.setState({
            finalStage: false,
            buttonText : "Next"
        })
    }

    render() {        
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#"> Sidewalk Validation </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" onClick={this.reset}> Start New Validation</a>
                    </li>
                    <li className="nav-item active">
                        <button onClick={this.next} className="btn btn-outline-success my-2 my-sm-0"> {this.state.buttonText} <span className="sr-only"></span></button>
                    </li>
                </ul>
                </div>
                </nav>
        );
    }
}
export default NavBarContainer;
import React, { Component } from "react";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import QuestionContainer from "../presentational/QuestionContainer";
import { Button, Modal } from "react-bootstrap";
import data from "../validateQuestions";

import '../css/Validation.css'

class ValidationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature_id: 0,
            questions: [],
            showDialog: false,
            data: this.props.data
        }
        this.dataset = data;
        // later, we can fetch data from this class
        // this.dataset = {
        //     "sidewalk": [
        //         {
        //             "question": " what is 1 + 1?",
        //             "answers": ["1","2","3","4"]    
        //         },
        //         {
        //             "question": " what is 1 + 2?",
        //             "answers": ["5","6","7","8"] 
        //         },
        //         {
        //             "question": " what is 1 * 2?",
        //             "answers": ["9","10","11","12"] 
        //         }   
        //     ],
        //     "crossing": [
        //         {
        //             "question": "Are there raised curbs on this crossing?",
        //             "answers": ["Yes", "No"],
        //             "datatype" : "curbs"
        //         },
        //         {
        //             "question": "Are there markings on this crossing?",
        //             "answers": ["Yes", "No"],
        //             "datatype" : "crossing"
        //         }
        //     ]

        // };
    }

    next = (data) => {
        console.log(this.state.data)
        let id = this.state.feature_id
        let prev = this.state.data.features[id].properties;
        this.state.data.features[id].properties = Object.assign({}, prev, data);

    }

    nextFeature = () => {
        this.props.validateCallback(this.state.data)
        this.setState({
            feature_id: id++
        })
    }

    confirmation = () => {
        if (this.state.feature != null) {
            this.setState({
                questions: this.dataset[this.state.feature]
            })
        }
    }

    // set state to close "Chosing Featuer" dialog
    closeDialog = () => {
        this.setState({ showDialog: false });
    }
    // set state to show "Chosing Featuer" dialog
    showDialog = () => {
        this.setState({ showDialog: true });
    }

    chooseFeature = (e) => {
        this.setState({
            feature: String(e)
        })
    }
    render() {
        const choices = Object.keys(this.dataset).map((element) =>
            <RadioButton key={element} value={element} iconSize={20} iconInnerSize={8} >{element}</RadioButton>
        );
        const intro = (
            <React.Fragment>
                <RadioGroup horizontal onChange={this.chooseFeature}>
                    {choices}
                </RadioGroup>
                <Button variant="success" onClick={this.confirmation}>Next</Button>
            </React.Fragment>
        );
        const questionnaire = <QuestionContainer next={(data) => this.next(data)} feature_id={this.state.feature_id} question={this.state.questions} />

        const dialog = (
            <Modal size="lg" centered show={this.state.showDialog} onHide={this.closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Which type of feature do you want to validate today?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeDialog}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );

        return (
            <Modal size="lg" centered show={this.state.showDialog} onHide={this.closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Which type of feature do you want to validate today?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.questions.length != 0 ? questionnaire : intro}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeDialog}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
            /* <React.Fragment>
                <div className="validation">
                    {this.state.questions.length != 0 ? questionnaire : intro}
                </div>
                {this.state.showDialog == true ? dialog : null}
            </React.Fragment> */
        );
    }
}

export default ValidationContainer;
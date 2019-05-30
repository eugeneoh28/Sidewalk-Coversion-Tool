import React, { Component } from "react";
import QuestionContainer from "../presentational/QuestionContainer";
import data from "../validateQuestions";

import Radio from '@material-ui/core/Radio';
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import '../css/Validation.css'

class ValidationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature_id: 0,
            questions: [],
            showDialog: true,
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
        this.closeDialog();
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
            feature: String(e.target.value)
        })
    }
    
    render() {
        const choices = Object.keys(this.dataset).map((element) =>
            <FormControlLabel key={element} value={element} control={<Radio />} label={element} />
        );
        const intro = (
            <Dialog open={this.state.showDialog} onClose={this.closeDialog}>
                <DialogTitle>Choose a feature type</DialogTitle>
                <DialogContent>
                    <DialogContentText> Which type of feature do you want to validate today? </DialogContentText>
                    <FormControl component="fieldset">
                        <RadioGroup row={true} onChange={this.chooseFeature}>
                            {choices}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.confirmation} variant="contained" color="primary">Next</Button>
                    <Button onClick={this.closeDialog} variant="contained" color="default">Cancel</Button>
                </DialogActions>
            </Dialog>
        );
        const questionnaire = <QuestionContainer next={(data) => this.next(data)} feature_id={this.state.feature_id} question={this.state.questions} />
        return (
            <React.Fragment>
                <div className="validation">
                    {this.state.questions.length != 0 ? questionnaire : intro}
                </div>
            </React.Fragment>
        );
    }
}

export default ValidationContainer;
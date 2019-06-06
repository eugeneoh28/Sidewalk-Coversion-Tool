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
            showOption: this.props.showOption,
            data: this.props.data
        }
        this.dataset = data;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showOption != this.state.showOption) {
           this.setState({
                showOption : nextProps.showOption
           })
        }
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
            feature_id: id++,
            showOption: true
        })
    }

    confirmation = () => {
        if (this.state.feature != null) {
            this.setState({
                questions: this.dataset[this.state.feature],
                showOption: false
            })
        }
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
                    <React.Fragment>
                    Which type of feature do you want to validate today?
                        <RadioGroup row={true} onChange={this.chooseFeature}>
                            {choices}
                        </RadioGroup>
                    <Button onClick={this.confirmation} variant="contained" color="primary">Next</Button>
                    </React.Fragment>
        );
        const questionnaire = <QuestionContainer next={(data) => this.next(data)} feature_id={this.state.feature_id} question={this.state.questions} />
        return (
            <React.Fragment>
                <div className="validation">
                    {this.state.showOption ? intro : questionnaire}
                </div>
            </React.Fragment>
        );
    }
}

export default ValidationContainer;
import React, {Component} from "react";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import QuestionContainer from "../presentational/QuestionContainer";

class ValidationContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            feature_id: 0,
            questions: [],            
            data: this.props.data
        }
        //later, we can fetch data from this class
        this.dataset = {
            "sidewalk": [
                {
                    "question": " what is 1 + 1?",
                    "answers": ["1","2","3","4"]    
                },
                {
                    "question": " what is 1 + 2?",
                    "answers": ["5","6","7","8"] 
                },
                {
                    "question": " what is 1 * 2?",
                    "answers": ["9","10","11","12"] 
                }   
            ],
            "crossing": [
                {
                    "question": "Are there raised curbs on this crossing?",
                    "answers": ["Yes", "No"],
                    "datatype" : "curbs"
                },
                {
                    "question": "Are there markings on this crossing?",
                    "answers": ["Yes", "No"],
                    "datatype" : "crossing"
                }
            ]

        };
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
            feature_id : id++
        })
    }

    confirmation = () => {
        if (this.state.feature != null) {
            this.setState({
                questions : this.dataset[this.state.feature]
            })
        }
    }

    chooseFeature = (e) => {
        this.setState({
            feature : String(e)
        })
    }
    render(){
        const choices = Object.keys(this.dataset).map((element) =>
            <RadioButton key={element} value={element}>{element}</RadioButton>
        );
        const intro = (
            <React.Fragment>
                <h3>What type of feature is this?</h3>
                <RadioGroup horizontal onChange={this.chooseFeature}>
                    {choices}
                </RadioGroup>
                <button onClick={this.confirmation}>Next</button>
            </React.Fragment>
        );
        const questionnaire = <QuestionContainer next={(data) => this.next(data)} feature_id={this.state.feature_id} question={this.state.questions}/>
        
        
        return (
            <React.Fragment>
                <div className="validation" style={{overflow:'auto', maxHeight:400}}>
                    {this.state.questions.length != 0 ? questionnaire : intro}
                </div>
            </React.Fragment>
        );
    }
}

export default ValidationContainer;
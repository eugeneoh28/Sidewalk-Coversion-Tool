import React, {Component} from "react";
import QuestionContainer from "./QuestionContainer";

class ValidationContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            feature: null
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
                    "answers": ["1","2","3","4"] 
                },
                {
                    "question": " what is 1 * 2?",
                    "answers": ["1","2","3","4"] 
                }   
            ],
            "crossing": [
                {
                    "question": "Are there raised curbs on this crossing?",
                    "answers": ["Yes", "No"]
                },
                {
                    "question": "Are there markings on this crossing?",
                    "answers": ["Yes", "No"]
                }
            ]

        };
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
            feature : e.target.value 
        })
    }
    render(){
        const intro = (
            <p>What type of feature is this?</p>
        );
        const confirm = (
            <button onClick={this.confirmation}>Next</button>
        );
        const choices = Object.keys(this.dataset).map( (element) =>
            <div key={element}>
                <input type="radio" key={element} value={element} onChange={this.chooseFeature}/>{element}
            </div>
        );
        const questionnaire = this.state.questions.map( (element) => 
            <QuestionContainer key={element.question} question={element.question} answers={element.answers}/>
        );
        
        return (
            <React.Fragment>
                <div className="validation" style={{overflow:'auto', maxHeight:200}}>
                    {this.state.questions.length != 0 ? null : intro}
                    {this.state.questions.length != 0 ? questionnaire : choices}
                    {this.state.questions.length != 0 ? null : confirm}
                </div>
                <button>Submit</button>
            </React.Fragment>
        );
    }
}

export default ValidationContainer;
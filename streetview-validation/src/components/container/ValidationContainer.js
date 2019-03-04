import React, {Component} from "react";
import QuestionContainer from "./QuestionContainer";

class ValidationContainer extends Component {
    constructor(props){
        super(props);
    
    this.dataset = [
        {
            question: " what is 1 + 1?",
            answers: ["1","2","3","4"]    
        },
        {
            question: " what is 1 + 2?",
            answers: ["1","2","3","4"] 
        },
        {
            question: " what is 1 * 2?",
            answers: ["1","2","3","4"] 
        },
        {
            question: " what is 2 * 2?",
            answers: ["1","2","3","4"] 
        },
        {
            question: " what is 2 + 2?",
            answers: ["1","2","3","4"] 
        }   
    ];
    }
    render(){
        const questionnaire = this.dataset.map( (element) => 
            <QuestionContainer key={element.question} question={element.question} answers={element.answers}/>
        );
        return (
            <React.Fragment>
                <div className="validation" style={{overflow:'auto', maxHeight:200}}>
                    {questionnaire}
                </div>
                <button>Submit</button>
            </React.Fragment>
        );
    }
}

export default ValidationContainer;
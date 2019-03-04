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
        } 
    ];
    }
    render(){
        const questionnaire = this.dataset.map( (element) => 
            <QuestionContainer key={element.question} question={element.question} answers={element.answers}/>
        );
        return (
            <div>
                {questionnaire}
            </div>
        );
    }
}

export default ValidationContainer;
import  React,{Component} from "react";
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class QuestionContainer extends Component {
    constructor(props){
        super(props);
        this.state ={
                question : this.props.question,
                answers : this.props.answers, 
                displayAnswers : false}

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
    }


    buttonClickHandler(){
        this.setState ({
            displayAnswers : !this.state.displayAnswers
        });
    }

    render() {
        let answerForm = null;
        if (this.state.displayAnswers){
            const radioButtons = this.state.answers.map( (ans) =>
                <RadioButton key="ans" value="apple" rootColor="lightblue"> {ans} </RadioButton>
            );
            answerForm = (
                <RadioGroup horizontal>
                    {radioButtons}
                </RadioGroup>
            );
        }
        
        return (
            <div>
                <button onClick={this.buttonClickHandler}>{this.state.question}</button>
                {answerForm}
            </div>
        );
    }
}
export default QuestionContainer;
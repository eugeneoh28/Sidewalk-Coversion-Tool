import  React,{Component} from "react";
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class QuestionContainer extends Component {

    render() {
        const question = this.props.question;
        const radioButtons = this.props.answers.map( (ans) =>
            <RadioButton key="ans" value="apple"> {ans} </RadioButton>
        );
        return (
            <div>
                <label>{question}</label>
                <RadioGroup horizontal>
                    {radioButtons}
                </RadioGroup>
            </div>
        );
    }
}
export default QuestionContainer;
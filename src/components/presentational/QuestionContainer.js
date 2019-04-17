import  React,{Component} from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class QuestionContainer extends Component {
    constructor(props){
        super(props);
        console.log(this.props.feature_id);
        console.log(this.props.question)
        this.state = {
            feature_id: this.props.feature_id,
            question : this.props.question,
            q_no : 0,
            data : {}
        }
    }

    questionHandler = (e) =>  {
        console.log("here!")
        console.log(e.key)
        console.log(e)
        this.setState ({
            q_no: e
        })
    }
    
    answerHandler = (e) => {
        let dtype =  this.props.question[this.state.q_no].datatype
        let ndata = Object.assign({}, this.state.data, {
            [dtype] : e.target.textContent
        })
        this.setState({
            data : ndata
        })
        this.props.next(ndata)
    }

    render() {
        let dropdowns = this.props.question.map((element, index) => {
            return <Dropdown.Item key={index} eventKey={index} onSelect={this.questionHandler}>{element["question"]}</Dropdown.Item>
        });
        let answers = this.props.question[this.state.q_no].answers.map((ans, index) => {
            return <RadioButton key={index} value={ans} rootColor="lightblue"> {ans} </RadioButton>
        });        
        return (
            <div>
                <h3> {this.props.question[this.state.q_no].question}</h3>
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle split variant="success" id="dropdown-custom-2">Choose validation question</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dropdowns}
                    </Dropdown.Menu>
                </Dropdown>
                <RadioGroup onClick={this.answerHandler}>
                    {answers}
                </RadioGroup>
            </div>
        );
    }
}
export default QuestionContainer;
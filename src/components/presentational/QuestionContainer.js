import  React,{Component} from "react";
import {ButtonGroup,Dropdown} from "react-bootstrap";
import Form from "react-bootstrap/Form";
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
            return <Form.Check custom type='radio' key={index} id={index} label={ans} />
        });        
        return (
            <div>
                <p> {this.props.question[this.state.q_no].question}</p>
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle split variant="success" id="dropdown-custom-2">Choose validation question</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dropdowns}
                    </Dropdown.Menu>
                </Dropdown>
                <Form onClick={this.answerHandler}>
                        {answers}
                </Form>
            </div>
        );
    }
}
export default QuestionContainer;
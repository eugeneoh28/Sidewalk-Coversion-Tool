import React, { Component } from "react";
import { ButtonGroup, Dropdown, Container, Row, Col } from "react-bootstrap";
import Form2 from 'react-bootstrap/Form'
import { Form, Radio } from 'semantic-ui-react'
import "../css/Question.css"
class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.feature_id);
        console.log(this.props.question)
        this.state = {
            feature_id: this.props.feature_id,
            question: this.props.question,
            q_no: 0,
            data: {},
        }
    }

    // questionHandler = (e) =>  {
    //     console.log("here!")
    //     console.log(e.key)
    //     console.log(e)
    //     this.setState ({
    //         q_no: e
    //     })
    // }
    // answerHandler = (e) => {
    //     let dtype =  this.props.question[this.state.q_no].datatype
    //     let ndata = Object.assign({}, this.state.data, {
    //         [dtype] : e.target.textContent
    //     })
    //     this.setState({
    //         data : ndata
    //     })
    //     this.props.next(ndata)
    // }
    questionHandler = (e) => {
        // https://stackoverflow.com/questions/49856257/how-to-send-value-to-state-using-react-bootstrap-formcontrol-dropdown
        this.setState({ q_no: e.target.value });
    }
    // second param must be "value", DON'T change it
    answerHandler = (e, { value }) => {
        this.setState({ answer: value });
    }
    handleChange = (e) => {
        console.log(e.target.value);
    }
    render() {
        // let dropdowns = this.props.question.map((element, index) => {
        //     return <Dropdown.Item key={index} eventKey={index} onSelect={this.questionHandler}>{element["question"]}</Dropdown.Item>
        // });
        let questionList = this.props.question.map((element, index) => {
            return <option key={index} value={index} onSelect={this.questionHandler}>{element["question"]}</option>
        });
        let answers = this.props.question[this.state.q_no].answers.map((ans, index) => {
            return <Form.Field key={index}>
                <Radio label={ans} value={ans} checked={this.state.answer == ans} onChange={this.answerHandler} />
                {ans == "other" ? <input disabled={this.state.answer !== "other"} placeholder="enter other" /> : null}
            </Form.Field>
        });
        return (
            <Container>

                {/*<Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle split variant="success" id="dropdown-custom-2">Choose validation question</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dropdowns}
                    </Dropdown.Menu>
        </Dropdown> */}
                <Row>
                    <Col>
                        <Form2.Group controlId="question-list">
                            <Form2.Label >Select one of the questions below:</Form2.Label>
                            <Form2.Control id="questionlist" as="select" multiple onChange={this.questionHandler} >
                                {questionList}
                            </Form2.Control>
                        </Form2.Group>
                    </Col>
                    <Col>
                        <Form2.Label id="question"> {this.props.question[this.state.q_no].question}</Form2.Label>
                        <Form>
                            {answers}
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default QuestionContainer;
import React, { Component } from "react";
import { ButtonGroup, Dropdown, Form, Container, Row, Col } from "react-bootstrap";
//import Form2 from 'react-bootstrap/Form'
//import { Form, Radio } from 'semantic-ui-react'
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
    answerHandler = (e) => {
        this.setState({ answer: e.target.value });
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
            // DO NOT REMOVE OR CHANGE name and id unless you know what you are doing
            // react-bootstrap uses these attributes to differtiate radios, so that only one chosen at a time
            return <Form.Group key={index}>
                <Form.Check custom type="radio" value={ans} label={ans} name="answerRadio" id={`answerRadio${index}`} onChange={this.answerHandler} />
                {ans == "other" ? <Form.Control disabled={this.state.answer !== "other"} placeholder="enter other" /> : null}
            </Form.Group>
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
                        <Form.Group>
                            <Form.Label >Select one of the questions below:</Form.Label>
                            <Form.Control className="questionlist" as="select" multiple onChange={this.questionHandler} >
                                {questionList}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        {/** go to https://react-bootstrap.github.io/components/forms/#forms-layout-group look for "horizontal form" to see example */}
                        <Form.Label id="question"> {this.props.question[this.state.q_no].question}</Form.Label>
                        <fieldset>
                            <Form.Group as={Row}>
                                <Col sm={10}>
                                    {answers}
                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default QuestionContainer;
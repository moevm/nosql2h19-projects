import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,

    Form,
    FormGroup,

    Input,
    InputGroup,
    Row,
} from 'reactstrap';
import {Link} from "react-router-dom";
// import UserUtil from "frontend/src/utils/userUtil";

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: "",
                dateOfBirth: "",
                education: "",
                university: "",
            }
        };
        this.onChange = this.onChange.bind(this);
        // this.addUser = this.getUserList.bind(this);

    }
    // addUser() {
    //     UserUtil.addUser(this.state.formData).then(response => this.setState({
    //         ...this.state
    //     }))
    //
    // }
    onChange({target: {name, value}}) {
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: value}
        });
    }
    render() {
        console.log(this.state.formData);
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="4">
                        <Card>
                            <CardHeader>
                                Добавление сотрудника
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.username} type="text" onChange={this.onChange}  name="username" placeholder="ФИО"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.dateOfBirth} type="text" onChange={this.onChange} name="dateOfBirth" placeholder="Дата рождения"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.education} type="text" onChange={this.onChange} name="education" placeholder="Образование"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.university} type="text" onChange={this.onChange} name="university" placeholder="Университет"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="form-actions">
                                        <Link to="/user/list"><Button type="submit" size="sm" color="success" onClick
                                                                        className="mr-3">Добавить</Button></Link>
                                        <Link to="/user/list"><Button type="submit" size="sm"
                                                                      color="secondary">Отмена</Button></Link>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
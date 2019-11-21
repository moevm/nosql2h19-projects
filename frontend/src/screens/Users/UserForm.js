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
import UserUtil from "../../utils/userUtil";
import moment from "moment";

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
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

    }

    addUser() {
        UserUtil.addUser(this.state.formData).then(() => this.props.history.push("/user/list"));
    }
    updateUser() {
        UserUtil.updateUser(this.state.formData).then(() => this.props.history.push("/user/list"));
    }

    onChange({target: {name, value}}) {
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: value}
        });
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            UserUtil.getUser(this.props.match.params.id).then(({data}) =>
                this.setState({
                    ...this.state, formData: {
                        _id: data._id,
                        username: data.fio,
                        dateOfBirth: moment(data.date_of_birth).format("DD.MM.YYYY"),
                        education: data.education,
                        university: data.graduated_institution,
                    }
                }))
        }
    }

    render() {
        console.log(this.state.formData);
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="4">
                        <Card>
                            <CardHeader>
                                {this.props.match.params.id ?
                                    "Редактирование сотрудника" : "Добавление сотрудника"}
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.username} type="text"
                                                   onChange={this.onChange} name="username" placeholder="ФИО"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.dateOfBirth} type="text"
                                                   onChange={this.onChange} name="dateOfBirth"
                                                   placeholder="Дата рождения"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.education} type="text"
                                                   onChange={this.onChange} name="education" placeholder="Образование"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input value={this.state.formData.university} type="text"
                                                   onChange={this.onChange} name="university"
                                                   placeholder="Университет"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="form-actions">
                                        {this.props.match.params.id ?
                                            <Button size="sm" color="primary" onClick={this.updateUser}
                                                    className="mr-3">Обновить</Button> :
                                            <Button size="sm" color="success" onClick={this.addUser}
                                                    className="mr-3">Добавить</Button>}
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
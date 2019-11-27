import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Label,
    Form,
    FormGroup,
    Input,
    Row,
} from 'reactstrap';
import {Link} from "react-router-dom";
import UserUtil from "../../utils/userUtil";
import moment from "moment";
import Select from 'react-select';
import ProjectUtil from "../../utils/projectUtil";

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];

export default class ProjectReviewEmployeeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                employeeId: null,
                role: "",
            },
            select: undefined,
            participants: []
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.addProjectEmployee = this.addUser.bind(this);
        this.projectEmployee = this.updateUser.bind(this);

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

    onChangeSelect(option) {
        this.setState({
            ...this.state,
            formData: {...this.state.formData, employeeId: option.value},
            select: option
        });
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            // UserUtil.getUser(this.props.match.params.id).then(({data}) =>
            //     this.setState({
            //         ...this.state, formData: {
            //             employeeId: data.employeeId,
            //             role: data.role,
            //         }
            //     }))
        }
        ProjectUtil.getProjectParticipants(this.props.match.params.projectId).then(response => this.setState({
            ...this.state,
            participants: response.data.map(participant => ({
                value: participant._id,
                label: participant.fio,
            }))
        }));
    }

    render() {
        console.log(this.state);
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
                                        <Label htmlFor="username">Сотрудник</Label>
                                        <Select
                                            value={this.state.select}
                                            onChange={this.onChangeSelect}
                                            options={this.state.participants}
                                            name="employeeId" placeholder="ФИО"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="dateOfBirth">Роль в проекте</Label>
                                        <Input value={this.state.formData.role} type="text"
                                               onChange={this.onChange} name="role"
                                               placeholder="Роль"/>
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
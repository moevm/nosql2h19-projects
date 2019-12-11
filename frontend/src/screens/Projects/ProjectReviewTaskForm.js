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


export default class ProjectReviewTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                projectId: this.props.match.params.projectId,
                participantId: this.props.match.params.participantId || null,
                role: "",
            },
            select: undefined,
            participants: []
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.addProjectParticipant = this.addProjectParticipant.bind(this);
        this.updateProjectParticipant = this.updateProjectParticipant.bind(this);

    }

    addProjectParticipant() {
        ProjectUtil.addProjectParticipant(this.state.formData).then(() => this.props.history.push(`/project/review/${this.props.match.params.projectId}/task/list`));
    }

    updateProjectParticipant() {
        ProjectUtil.updateProjectParticipant(this.state.formData).then(() => this.props.history.push(`/project/review/${this.props.match.params.projectId}/task/list`));
    }

    onChange({target: {name, value}}) {
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: value}
        });
    }

    onChangeSelect(option) {
        console.log(option);
        this.setState({
            ...this.state,
            formData: {...this.state.formData, participantId: option.value},
            select: option
        });
    }

    componentDidMount() {
        if (this.props.match.params.participantId) {
            ProjectUtil.getProjectParticipant(
                this.props.match.params.projectId,
                this.props.match.params.participantId).then(({data}) =>
                this.setState({
                    ...this.state,
                    formData: {
                        ...this.state.formData,
                        role: data.role,
                    },
                    select: {
                        value: this.state.formData.participantId,
                        label: data.fio
                    }
                }))
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
                                {this.props.match.params.participantId ?
                                    "Редактирование сотрудника" : "Добавление сотрудника"}
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label htmlFor="role">Задача</Label>
                                        <Input value={this.state.formData.taskName} type="text"
                                               onChange={this.onChange} name="taskName"
                                               placeholder="Название задачи"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="date">Дата контроля</Label>
                                        <Input value={this.state.formData.date} type="text"
                                               onChange={this.onChange} name="date"
                                               placeholder="Дата контроля"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="username">Исполнитель</Label>
                                        <Select
                                            value={this.state.select}
                                            onChange={this.onChangeSelect}
                                            options={this.state.participants}
                                            isDisabled={this.props.match.params.taskId}
                                            name="taskId" placeholder="ФИО"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="status">Статус</Label>
                                        <Select
                                            value={this.state.select}
                                            onChange={this.onChangeSelect}
                                            options={this.state.status}
                                            name="status" placeholder="Статус"
                                        />
                                    </FormGroup>
                                    <FormGroup className="form-actions">
                                        {this.props.match.params.participantId ?
                                            <Button size="sm" color="primary" onClick={this.updateProjectParticipant}
                                                    className="mr-3">Обновить</Button> :
                                            <Button size="sm" color="success" onClick={this.addProjectParticipant}
                                                    className="mr-3">Добавить</Button>}
                                        <Link
                                            to={"/project/review/" + this.props.match.params.projectId + "/task/list"}><Button
                                            type="submit" size="sm"
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
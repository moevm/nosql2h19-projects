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
import moment from "moment";
import Select from 'react-select';
import ProjectUtil from "../../utils/projectUtil";

const TASK_TYPES = [
    {value: "В работе", label: "В работе"},
    {value: "Выполнено в срок", label: "Выполнено в срок"},
    {value: "Выполнено не в срок", label: "Выполнено не в срок"},
];

export default class ProjectReviewTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                projectId: this.props.match.params.projectId,
                participant: undefined,
                date: moment().format("YYYY-MM-DD"),
                taskName: "",
                status: "В работе",
            },
            participant: undefined,
            status: TASK_TYPES[0],
            participants: [],

        };
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.addProjectTask = this.addProjectTask.bind(this);
        this.updateProjectTask = this.updateProjectTask.bind(this);

    }

    addProjectTask() {
        ProjectUtil.addProjectTask(this.state.formData).then(() => this.props.history.push(`/project/review/${this.props.match.params.projectId}/task/list`));
    }

    updateProjectTask() {
        ProjectUtil.updateProjectTask(this.state.formData).then(() => this.props.history.push(`/project/review/${this.props.match.params.projectId}/task/list`));
    }

    onChange({target: {name, value}}) {
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: value}
        });
    }

    onChangeSelect(option, name) {
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: option.value},
            [name]: option
        });
    }

    componentDidMount() {
        if(this.props.match.params.taskId) {
            ProjectUtil.getProjectTask(
                this.props.match.params.projectId,
                this.props.match.params.taskId).then(({data}) =>
                this.setState({
                    ...this.state,
                    formData: {
                        ...this.state.formData,
                        date: moment(data.date_of_control).format("YYYY-MM-DD"),
                        taskName: data.name,
                        participant: data.employeeId,
                        status: data.status,
                        taskId: this.props.match.params.taskId,
                    },
                    status: {
                        value: data.status,
                        label: data.status
                    },
                    participant: {
                        value: data.employeeId,
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
                                {this.props.match.params.taskId ?
                                    "Редактирование задачи" : "Добавление задачи"}
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label htmlFor="taskName">Задача</Label>
                                        <Input value={this.state.formData.taskName} type="text"
                                               onChange={this.onChange} name="taskName"
                                               placeholder="Название задачи"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="date">Дата контроля</Label>
                                        <Input value={this.state.formData.date} type="date"
                                               onChange={this.onChange} name="date"
                                               placeholder="Дата контроля"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="participant">Исполнитель</Label>
                                        <Select
                                            value={this.state.participant}
                                            onChange={option => this.onChangeSelect(option, "participant")}
                                            options={this.state.participants}
                                            name="participant" placeholder="ФИО"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="status">Статус</Label>
                                        <Select
                                            value={this.state.status}
                                            onChange={option => this.onChangeSelect(option, "status")}
                                            options={TASK_TYPES}
                                            name="status" placeholder="Статус"
                                        />
                                    </FormGroup>
                                    <FormGroup className="form-actions">
                                        {this.props.match.params.taskId ?
                                            <Button size="sm" color="primary" onClick={this.updateProjectTask}
                                                    className="mr-3">Обновить</Button> :
                                            <Button size="sm" color="success" onClick={this.addProjectTask}
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
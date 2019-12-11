import React, {Component, Fragment} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row, Table
} from "reactstrap";
import moment from "moment";
import {Link} from "react-router-dom";
import ProjectUtil from "../../utils/projectUtil";

export default class ProjectReviewEmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
        this.deleteTask = this.deleteTask.bind(this);
        this.getProjectTasks = this.getProjectTasks.bind(this);
    }

    getProjectTasks() {
        ProjectUtil.getProjectTasks(this.props.match.params.id).then(response => this.setState({
            ...this.state,
            tasks: response.data
        }, () => console.log(response.data)));
    }

    deleteTask(id) {
        ProjectUtil.deleteProjectTask({
            projectId: this.props.match.params.id,
            taskId: id
        }).then(this.getProjectTasks);
    }

    componentDidMount() {
        this.getProjectTasks();
    }

    render() {
        return (
            <Fragment>
                <Link to={"/project/list"} style={{marginLeft: 'auto'}}><Button block color="secondary"
                                                                                className="mb-3 btn-project">К списку
                    проектов</Button></Link>
                <Link to={"/project/create-task/" + this.props.match.params.id} style={{marginLeft: '15px'}}><Button block color="success"
                                                                                  className="mb-3 btn-project">Добавить</Button></Link>

                <Table responsive bordered>
                    <thead>
                    <tr>
                        <th>Задача</th>
                        <th>Дата контроля</th>
                        <th>Исполнитель</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tasks.map((task) =>
                        <tr key={task._id}>
                            <td>{task.name}</td>
                            <td>{moment(task.date_of_control).format("DD.MM.YYYY")}</td>
                            <td>{task.fio}</td>
                            <td>{task.status}</td>
                            <td>
                                <Link to={"/project/update-task/" + this.props.match.params.id + "/" + task._id}
                                      className="fa fa-pencil font-2xl mr-3"/>
                                <i className="fa fa-trash-o font-2xl"
                                   onClick={() => this.deleteTask(task._id)}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Fragment>)
    }
}
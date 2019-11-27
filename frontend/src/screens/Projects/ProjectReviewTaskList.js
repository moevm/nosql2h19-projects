import React, {Component} from 'react';
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
        }
    }

    getProjectList() {
        ProjectUtil.getProjectTasks(this.props.match.params.id).then(response => this.setState({
            ...this.state,
            tasks: response.data
        }))
    }

    componentDidMount() {
        this.getProjectList();
    }

    render() {
        return (
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
                    <tr key={task.name}>
                        <td>{task.name}</td>
                        <td>{moment(task.date_of_control).format("DD.MM.YYYY")}</td>
                        <td>{task.fio}</td>
                        <td>{task.status}</td>
                        <td>
                            <Link to={"/user/update/"}
                                  className="fa fa-pencil font-2xl mr-3"/>
                            <i className="fa fa-trash-o font-2xl"
                               onClick={() => this.deleteProject()}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>)
    }
}
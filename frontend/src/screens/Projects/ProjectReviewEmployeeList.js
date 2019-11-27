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
import {Link} from "react-router-dom";
import ProjectUtil from "../../utils/projectUtil";

export default class ProjectReviewEmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: []
        }
    }

    getProjectList() {
        ProjectUtil.getProjectParticipants(this.props.match.params.id).then(response => this.setState({
            ...this.state,
            participants: response.data
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
                    <th>Сотрудник</th>
                    <th>Роль</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.participants.map((participant) =>
                    <tr key={participant._id}>
                        <td>{participant.fio}</td>
                        <td>{participant.role}</td>
                        <td>
                            <Link to={"/user/update/"}
                                  className="fa fa-pencil font-2xl mr-3"/>
                            <i className="fa fa-trash-o font-2xl"
                               onClick={() => this.deleteProject(participant._id)}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>)
    }
}
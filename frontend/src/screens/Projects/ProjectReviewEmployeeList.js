import React, {Component, Fragment} from 'react';
import {
    Button,
    Table
} from "reactstrap";
import {Link} from "react-router-dom";
import ProjectUtil from "../../utils/projectUtil";

export default class ProjectReviewEmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            data: {
                participantId: null,
                projectId: this.props.match.params.id,
            }
        };
        this.deleteParticipant = this.deleteParticipant.bind(this);
        this.getProjectParticipants = this.getProjectParticipants.bind(this);
    }

    getProjectParticipants() {
        ProjectUtil.getProjectParticipants(this.props.match.params.id).then(response => this.setState({
            ...this.state,
            participants: response.data
        }))
    }

    deleteParticipant(id) {
        this.setState({...this.state, data: {...this.state.data, participantId: id}});
        ProjectUtil.deleteParticipant(this.state.data).then(this.getProjectParticipants);
    }

    componentDidMount() {
        this.getProjectParticipants();
    }

    render() {
        return (
            <Fragment>
                <Link to={"/project/list"} style={{marginLeft: 'auto'}}><Button block color="secondary" className="mb-3 btn-project">К списку проектов</Button></Link>
                <Link to={"/project/create-participant/" + this.props.match.params.id} style={{marginLeft: '15px'}}><Button block color="success" className="mb-3 btn-project">Добавить</Button></Link>
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
                                   onClick={() => this.deleteParticipant(participant._id)}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Fragment>)
    }
}
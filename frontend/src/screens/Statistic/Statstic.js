import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import {Link} from "react-router-dom";
import StatisticUtil from "../../utils/statisticUtil";
import moment from "moment";

export default class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadlines: [],
            rating: [],
        };
        this.getNearestDeadlines = this.getNearestDeadlines.bind(this);
        this.getEmployeeRating = this.getEmployeeRating.bind(this);
    }

    getNearestDeadlines() {
        StatisticUtil.getClosestDeadlines().then(response => this.setState({...this.state, deadlines: response.data}));
    }

    getEmployeeRating() {
        StatisticUtil.getEmployeeRating().then(response => this.setState({...this.state, rating: response.data}));
    }

    componentDidMount() {
        this.getNearestDeadlines();
        this.getEmployeeRating();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs={12} sm={6}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>Ближайшие даты контроля
                            </CardHeader>
                            <CardBody>
                                <Table responsive bordered>
                                    <thead>
                                    <tr>
                                        <th>Проект</th>
                                        <th>Задача</th>
                                        <th>Дата контроля</th>
                                        <th>Сотрудник</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.deadlines.map((deadline) =>
                                        <tr>
                                            <td>{deadline.name}</td>
                                            <td>{deadline.task}</td>
                                            <td>{moment(deadline.date_of_control).format("DD.MM.YYYY")}</td>
                                            <td>{deadline.fio}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>Рейтинг сотрудников
                            </CardHeader>
                            <CardBody>
                                <Table responsive bordered>
                                    <thead>
                                    <tr>
                                        <th>Сотрудник</th>
                                        <th>Рейтинг</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.rating.map((rating) =>
                                        <tr>
                                            <td>{rating.fio}</td>
                                            <td style={{
                                                color: rating.rating < -2 ? "red" : rating.rating < 2 ? "orange" : "green"
                                            }}><b>{rating.rating}</b></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
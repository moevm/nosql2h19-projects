import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table, FormGroup,Label,Input,Button} from "reactstrap";
import {Bar} from 'react-chartjs-2';
import StatisticUtil from "../../utils/statisticUtil";
import moment from "moment";

const options = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

export default class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadlines: [],
            rating: [],
            chartData: {
                labels: [],
                data: [],
            },
            formData: {
                dateStart: moment().subtract(2, "month").format('YYYY-MM-DD'),
                dateEnd: moment().format('YYYY-MM-DD'),
                taskStatus: "all",
                filterBy: "employee"
            }
        };
        this.getNearestDeadlines = this.getNearestDeadlines.bind(this);
        this.getEmployeeRating = this.getEmployeeRating.bind(this);
        this.getChartData = this.getChartData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getNearestDeadlines() {
        StatisticUtil.getClosestDeadlines().then(response => this.setState({...this.state, deadlines: response.data}));
    }

    getEmployeeRating() {
        StatisticUtil.getEmployeeRating().then(response => this.setState({...this.state, rating: response.data}));
    }

    getChartData() {
        StatisticUtil.getChartData(this.state.formData).then(data => this.setState({...this.state, chartData: data}));
    }

    componentDidMount() {
        this.getNearestDeadlines();
        this.getEmployeeRating();
        this.getChartData();
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            ...this.state, formData: {
                ...this.state.formData,
                [target.name]: target.value
            }
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs={12} sm={3}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>Фильтры
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label htmlFor="dateStart">Начало периода</Label>
                                    <Input name="dateStart" type="date" value={this.state.formData.dateStart}
                                           onChange={this.handleInputChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="dateEnd">Конец периода</Label>
                                    <Input name="dateEnd" type="date" value={this.state.formData.dateEnd}
                                           onChange={this.handleInputChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="taskStatus">Статус задачи</Label>
                                    <Input type="select" name="taskStatus"
                                           value={this.state.formData.taskStatus}
                                           onChange={this.handleInputChange}>
                                        <option value="all">Все</option>
                                        <option value="В работе">В работе</option>
                                        <option value="Выполнено не в срок">Выполнено не в срок</option>
                                        <option value="Выполнено в срок">Выполнено в срок</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="filterBy">Фильтрация по</Label>
                                    <Input type="select" name="filterBy"
                                           value={this.state.formData.filterBy}
                                           onChange={this.handleInputChange}>
                                        <option value="employee">Сотрудник</option>
                                        <option value="project">Проект</option>
                                        <option value="university">Университет</option>
                                        <option value="education">Образование</option>
                                    </Input>
                                </FormGroup>
                                <div className="form-actions">
                                    <Button color="primary" style={{width: '100%'}}
                                            onClick={this.getChartData}>Обновить</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={12} sm={9}>
                        <Card style={{minHeight: 443}}>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>График зависимости от задач
                            </CardHeader>
                            <CardBody>
                                <Bar data={{
                                    labels: this.state.chartData.labels,
                                    datasets: [{label: "Задачи", data: this.state.chartData.data,
                                        backgroundColor: 'rgb(2,147,230)',
                                        borderColor: 'rgba(2,147,230,0.8)',
                                        borderWidth: 1,}]
                                }}
                                     options={options}></Bar>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
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
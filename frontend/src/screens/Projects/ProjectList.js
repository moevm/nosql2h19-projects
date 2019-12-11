import React, {Component} from 'react'
import moment from 'moment'
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
    Row,
    Table
} from 'reactstrap'
import ProjectUtil from "../../utils/projectUtil";
import "../index.sass"
import {Link} from "react-router-dom";

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            formData: {
                projectName: "",
            }
        };
        this.onChange = this.onChange.bind(this);
        this.getProjectList = this.getProjectList.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.timeout = undefined;
    }

    onChange({target: {name, value}}) {
        clearTimeout(this.timeout);
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: value}
        });
        this.timeout = setTimeout(this.getProjectList, 300);
    }

    getProjectList() {
        ProjectUtil.getProjectList(this.state.formData.projectName).then(response => this.setState({
            ...this.state,
            projects: response.data
        }))
    }

    componentDidMount() {
        this.getProjectList();
    }

    deleteProject(id) {
        ProjectUtil.deleteProject(id).then(this.getProjectList);
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Список проектов
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-end">
                                    <Col xs="10">
                                        <Form className="form-horizontal">
                                            <FormGroup>
                                                <Label htmlFor="prependedInput">Поиск по названию проекта</Label>
                                                <div className="controls">
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText><i
                                                                className="fa fa-search"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            value={this.state.formData.projectName}
                                                            name="projectName"
                                                            onChange={this.onChange}
                                                            id="prependedInput"
                                                            size="16"
                                                            type="text"/>
                                                    </InputGroup>
                                                </div>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                    <Col xs="2">
                                        <Link to="/project/create"><Button block color="success" className="mb-3">Добавить</Button></Link>
                                    </Col>
                                </Row>
                                <Table responsive bordered>
                                    <thead>
                                    <tr>
                                        <th>Проект</th>
                                        <th>Теги</th>
                                        <th>Участники</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.projects.map((project) =>
                                        <tr>
                                            <td>{project.name}</td>
                                            <td>{project.tags}</td>
                                            <td>{project.count}</td>
                                            <td>
                                                {/*<Link to={"/user/update/" + user._id} className="fa fa-pencil font-2xl mr-3"></Link>*/}
                                                {/*<i className="fa fa-trash-o font-2xl" onClick={() => this.deleteUser(user._id)}></i>*/}
                                                <Link to={"/project/review/" + project._id + "/employee/list"} className="fa fa-eye font-2xl mr-3"></Link>
                                                <Link to={"/project/update/" + project._id} className="fa fa-pencil font-2xl mr-3"></Link>
                                                <i className="fa fa-trash-o font-2xl" onClick={() => this.deleteProject(project._id)}></i>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                                {/*<Pagination>*/}
                                {/*    <PaginationItem><PaginationLink previous*/}
                                {/*                                    tag="button">Prev</PaginationLink></PaginationItem>*/}
                                {/*    <PaginationItem active>*/}
                                {/*        <PaginationLink tag="button">1</PaginationLink>*/}
                                {/*    </PaginationItem>*/}
                                {/*    <PaginationItem className="page-item"><PaginationLink*/}
                                {/*        tag="button">2</PaginationLink></PaginationItem>*/}
                                {/*    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>*/}
                                {/*    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>*/}
                                {/*    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
                                {/*</Pagination>*/}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

}
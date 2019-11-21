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
import UserUtil from "../../utils/userUtil";
import "../index.sass"
import {Link} from "react-router-dom";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            formData: {
                username: "",
            }
        };
        this.onChange = this.onChange.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.timeout = undefined;
    }

    onChange({target: {name, value}}) {
        clearTimeout(this.timeout);
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: value}
        });
        this.timeout = setTimeout(this.getUserList, 300);
    }

    getUserList() {

        UserUtil.getUserList(this.state.formData.username).then(response => this.setState({
            ...this.state,
            users: response.data
        }))

    }

    componentDidMount() {
        this.getUserList();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Список сотрудников
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-end">
                                    <Col xs="10">
                                        <Form className="form-horizontal">
                                            <FormGroup>
                                                <Label htmlFor="prependedInput">Поиск по ФИО</Label>
                                                <div className="controls">
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText><i
                                                                className="fa fa-search"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            value={this.state.formData.username}
                                                            name="username"
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
                                        <Link to="/user/create"><Button block color="success" className="mb-3">Добавить</Button></Link>
                                    </Col>
                                </Row>
                                <Table responsive bordered>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Дата рождения</th>
                                        <th>Образование</th>
                                        <th>Унивеститет</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.users.map((user) =>
                                        <tr>
                                            <td>{user.fio}</td>
                                            <td>{moment(user.date_of_birth).format("DD.MM.YYYY")}</td>
                                            <td>{user.education}</td>
                                            <td>{user.graduated_institution}</td>
                                            <td>
                                                <Link to="/users/update" className="fa fa-pencil font-2xl mr-3"></Link>
                                                <Link to="/users/delete" className="fa fa-trash-o font-2xl" onClick = {() => { alert('Вы действительно хотите удалить запись?') }}></Link>
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
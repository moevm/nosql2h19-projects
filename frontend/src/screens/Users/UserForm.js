import React, {Component} from 'react'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,

    Form,
    FormGroup,

    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
} from 'reactstrap';
import {Link} from "react-router-dom";

export default class UserForm extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="4">
                        <Card>
                            <CardHeader>
                                Добавление сотрудника
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input type="text" name="username" placeholder="ФИО"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input type="text" name="date-of-birth" placeholder="Дата рождения"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input type="text" name="education" placeholder="Образование"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input type="text" name="university" placeholder="Университет"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="form-actions">
                                        <Button type="submit" size="sm" color="success" className="mr-3">Добавить</Button>
                                        <Link to="/user/list"><Button type="submit" size="sm" color="secondary">Отмена</Button></Link>
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
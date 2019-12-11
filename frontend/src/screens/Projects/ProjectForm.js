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
    InputGroup,
    Row,
} from 'reactstrap';
import {Link} from "react-router-dom";
import ProjectUtil from "../../utils/projectUtil";

export default class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                projectName: "",
                tags: "",

            }
        };
        this.onChange = this.onChange.bind(this);
        this.addProject = this.addProject.bind(this);
        this.updateProject = this.updateProject.bind(this);

    }

    addProject() {
        ProjectUtil.addProject(this.state.formData).then(() => this.props.history.push("/project/list"));
    }

    updateProject() {
        ProjectUtil.updateProject(this.state.formData).then(() => this.props.history.push("/project/list"));
    }

    onChange({target: {name, value}}) {
        this.setState({
            ...this.state,
            formData: {...this.state.formData, [name]: value}
        });
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            ProjectUtil.getProject(this.props.match.params.id).then(({data}) =>
                this.setState({
                    ...this.state, formData: {
                        _id: data._id,
                        projectName: data.name,
                        tags: data.tags,
                    }
                }))
        }
    }

    render() {
        console.log(this.state.formData);
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="4">
                        <Card>
                            <CardHeader>
                                {this.props.match.params.id ?
                                    "Редактирование проекта" : "Добавление проекта"}
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label htmlFor="projectName">Имя проекта</Label>
                                        <Input value={this.state.formData.projectName} type="text"
                                               onChange={this.onChange} name="projectName" placeholder="Имя проекта"/>

                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="tags">Теги</Label>
                                        <Input value={this.state.formData.tags} type="text"
                                               onChange={this.onChange} name="tags"
                                               placeholder="Теги"/>
                                    </FormGroup>
                                    <FormGroup className="form-actions">
                                        {this.props.match.params.id ?
                                            <Button size="sm" color="primary" onClick={this.updateProject}
                                                    className="mr-3">Обновить</Button> :
                                            <Button size="sm" color="success" onClick={this.addProject}
                                                    className="mr-3">Добавить</Button>}
                                        <Link to="/project/list"><Button type="submit" size="sm"
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
import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Alert, Col, Row} from "reactstrap";
import ImportExportUtil from "../../utils/importExportUtil";

export default class Config extends Component {
    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.sendImportFile = this.sendImportFile.bind(this);
        this.state = {
            alerts: {
                loading: false,
                error: false,
                success: false
            },
            file: undefined,
            fileName: undefined,
        }
    }

    handleFileChange(event) {
        this.setState({
            ...this.state, file: event.target.files[0], fileName: event.target.value
        });
    }

    sendImportFile() {
        this.setState({
            ...this.state,
            alerts: {...this.state.alerts, loading: true, error: false, success: false}
        });
        ImportExportUtil.importDatabase(this.state.file).then(() => {
            this.setState({
                ...this.state,
                alerts: {...this.state.alerts, loading: false, error: false, success: true}
            });
        }).catch(() => {
            this.setState({
                ...this.state,
                alerts: {...this.state.alerts, loading: true, error: true, success: false}
            });
        });
    }

    onDismiss(type) {
        this.setState({...this.state, alerts: {...this.state.alerts, [type]: false}});
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="3">
                        <Card>
                            <CardHeader>
                                Импорт/экспорт базы данных
                            </CardHeader>
                            <CardBody>
                                <Alert color="secondary" isOpen={this.state.alerts.loading}>
                                    Проверка...
                                </Alert>
                                <Alert color="danger" isOpen={this.state.alerts.error}
                                       toggle={this.onDismiss.bind(this, 'error')}>
                                    Ошибка
                                </Alert>
                                <Alert color="success" isOpen={this.state.alerts.success}
                                       toggle={this.onDismiss.bind(this, 'success')}>
                                    Данные успешно сохранены!
                                </Alert>
                                <FormGroup>
                                    <Input name="importFile" type="file" accept='.json' value={this.state.fileName}
                                           onChange={this.handleFileChange}/>
                                </FormGroup>
                                <div className="form-actions">
                                    <Button color="primary" style={{width: '100%'}}
                                            onClick={this.sendImportFile}>Импортировать</Button>
                                </div>
                                <hr/>
                                <div className="form-actions">
                                    <Button color="success" style={{width: '100%'}}
                                            onClick={ImportExportUtil.exportDatabase}>Экспортировать</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
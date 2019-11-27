// import React, {Component} from 'react';
// import {Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Alert} from "reactstrap";
//
// export default class Config extends Component {
//     render() {
//         return (
//             <div className="animated fadeIn">
//                 <Card>
//                     <CardHeader>
//                         Импорт/экспорт базы данных
//                     </CardHeader>
//                     <CardBody>
//                         <Alert color="secondary" isOpen={this.state.alerts.file_loading}>
//                             Проверка...
//                         </Alert>
//                         <Alert color="danger" isOpen={this.state.alerts.file_error}
//                                toggle={this.onDismiss.bind(this, 'file_error')}>
//                             Ошибка
//                         </Alert>
//                         <Alert color="success" isOpen={this.state.alerts.file_success}
//                                toggle={this.onDismiss.bind(this, 'file_success')}>
//                             Данные успешно сохранены!
//                         </Alert>
//                         <FormGroup>
//                             <Input name="importFile" type="file" accept='.json' value={this.state.fileName}
//                                    onChange={this.handleFileChange}/>
//                         </FormGroup>
//                         <div className="form-actions">
//                             <div className="row">
//                                 <div className="col-sm-6">
//                                     <Button color="dark" style={{width: '100%'}}
//                                             onClick={this.sendImportFile}>Импортировать</Button>
//                                 </div>
//                                 <div className="col-sm-6">
//                                     <Button color="primary" style={{width: '100%'}}
//                                             onClick={this.sendImportJira}>Импорт из Jira</Button>
//                                 </div>
//                             </div>
//                         </div>
//                         <hr/>
//                         <div className="form-actions">
//                             <Button color="success" style={{width: '100%'}}
//                                     onClick={ImportExportUtil.exportDatabase}>Экспортировать</Button>
//                         </div>
//                     </CardBody>
//                 </Card>
//             </div>
//         )
//     }
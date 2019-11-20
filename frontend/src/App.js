import React, {Component, Suspense} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import axios from 'axios';
import routes from './routes';
import "./App.scss";
import * as router from 'react-router-dom';
import {
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav
} from "@coreui/react";

import navigation from './nav';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text'
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000').then((res) => {
            this.setState({...this.state, text: res.data.text})
        })
    }

    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <div className="app-body">
                        <AppSidebar fixed display="lg">
                            <AppSidebarHeader/>
                            <AppSidebarForm/>
                            <Suspense>
                                {/*<AppSidebarNav navConfig={navigation} {...this.props} router={router}/>*/}
                            </Suspense>
                            <AppSidebarFooter/>
                            <AppSidebarMinimizer/>
                        </AppSidebar>
                        <main className="main">
                            <Container fluid>
                                <Suspense fallback={loading()}>
                                    <Switch>
                                        {routes.map((route, idx) => {
                                            return route.component ? (
                                                <Route
                                                    key={idx}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    name={route.name}
                                                    render={props => (
                                                        <route.component {...props} />
                                                    )}/>
                                            ) : (null);
                                        })}
                                        <Redirect from="/" to="/statistic"/>
                                    </Switch>
                                </Suspense>
                            </Container>
                        </main>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

import React, {Component, Suspense} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import axios from 'axios';
import routes from './routes';
import "./App.scss";
import Sidebar from "./screens/Sidebar";

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
                        <Sidebar/>
                        <main className="main">
                            <Container fluid>
                                <br/>
                                <br/>
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

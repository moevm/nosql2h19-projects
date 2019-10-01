import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

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
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        {this.state.text}
                    </p>
                </header>
            </div>
        );
    }
}

export default App;

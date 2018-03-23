import React, { Component } from 'react';
import './assets/css/login.css';

class LoginForm extends Component {
    constructor () {
        super();
        this.state = {
            mail: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }
    handleChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let newState = this.state;
        newState[name] = value;
        this.setState(newState);
    }
    login () {
        this.props.login(this.state.mail, this.state.password)
    }
    render () {
        return (
            <div id="login-form">
                <div className="login-form-content">
                    <input id="mailInput" className="login-form-content-input" placeholder="Mail" type="text" name="mail" value={this.state.mail} onChange={this.handleChange}/>
                    <input id="passwordInput" className="login-form-content-input" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <div className="login-form-content-button" onClick={this.login}>Login</div>
                </div>
            </div>
        );
    }
}

export default LoginForm

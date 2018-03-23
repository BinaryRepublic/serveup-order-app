import React, { Component } from 'react';
import './assets/css/login.css';

class LoginForm extends Component {
    render () {
        return (
            <div id="login-form">
                <div className="login-form-content">
                    <input id="mailInput" className="login-form-content-input" placeholder="Mail" type="text" name="mail"/>
                    <input id="passwordInput" className="login-form-content-input" placeholder="Password" type="password" name="password"/>
                    <div className="login-form-content-button" onClick={this.login}>Login</div>
                </div>
            </div>
        );
    }
}

export default LoginForm

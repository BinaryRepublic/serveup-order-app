import React, { Component } from 'react';
import './assets/css/login.css';
import LoginForm from './loginForm'
import LoginRestaurant from './loginRestaurant'

import AuthController from './library/authController';
import HttpHelper from './library/httpHelper';
import AuthStore from './library/authStore';

class Login extends Component {
    constructor (props) {
        super(props);

        this.auth = new AuthController();
        this.authStore = new AuthStore();
        this.http = new HttpHelper('http://138.68.71.39:4200');

        this.state = {
            login: !(this.authStore.isExpired())
        };

        this.login = this.login.bind(this);
    }
    login (mail, password) {
        if (mail && mail.length > 2 && password && password.length > 2) {
            this.auth.requestGrant(mail, password).then(() => {
                this.setState({login: true});
            }).catch(() => {
                alert('wrong credentials');
            });
        }
    }
    render () {
        let loginItem;
        if (!this.state.login) {
            loginItem = <LoginForm login={this.login.bind(this)} />;
        } else {
            loginItem = <LoginRestaurant/>;
        }
        return (
            <div id="login">
                {loginItem}
                <div id="login-bg">
                    <div id="login-bg-overlay"></div>
                    <div id="login-bg-image"></div>
                </div>
            </div>
        );
    }
}

export default Login

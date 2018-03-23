import React, { Component } from 'react';
import './assets/css/login.css';
import LoginForm from './loginForm'
import LoginRestaurant from './loginRestaurant'
// import RealmHelper from '../library/RealmHelper';
// import LoginController from '../library/LoginController';

class Login extends Component {
    constructor (props) {
        super(props);
        // this.loginController = new LoginController(false, new RealmHelper());

        this.login = this.login.bind(this);
    }
    login () {
        // let mail = document.getElementById('mailInput').value;
        // let password = document.getElementById('passwordInput').value;
        // if (mail && mail.length > 2 && password && password.length > 2) {
        //     this.loginController.requestGrant(mail, password);
        // }
    }
    render () {
        return (
            <div id="login">
                <LoginForm/>
                <LoginRestaurant/>
                <div id="login-bg">
                    <div id="login-bg-overlay"></div>
                    <div id="login-bg-image"></div>
                </div>
            </div>
        );
    }
}

export default Login

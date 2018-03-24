import React, { Component } from 'react';
import '../assets/css/login.css';
import LoginForm from './loginForm'
import LoginRestaurant from './loginRestaurant'

import AuthController from '../library/authController';
import HttpHelper from '../library/httpHelper';
import AuthStore from '../library/authStore';
import ServerConfig from "../library/serverConfig";

class Login extends Component {
    constructor (props) {
        super(props);

        this.cfg = new ServerConfig();

        this.auth = new AuthController();
        this.authStore = new AuthStore();
        this.http = new HttpHelper(this.cfg.adminApi);

        this.state = {
            login: !!(this.authStore.accessToken()),
            restaurants: []
        };
        if (this.state.login === true) {
            this.loadRestaurants();
        }

        this.login = this.login.bind(this);
        this.loadRestaurants = this.loadRestaurants.bind(this);
    }
    login (mail, password) {
        if (mail && mail.length > 2 && password && password.length > 2) {
            this.auth.requestGrant(mail, password).then(() => {
                this.loadRestaurants().then(() => {
                    this.setState({login: true});
                });
            }).catch(() => {
                alert('wrong credentials');
            });
        }
    }
    loadRestaurants () {
        const that = this;
        return new Promise((resolve) => {
            // load restaurants
            that.http = new HttpHelper(this.cfg.adminApi);
            that.http.get('/restaurants', {
                'accountId': that.authStore.accountId()
            }).then(res => {
                that.setState({restaurants: res});
                resolve();
            });
        });
    }
    logout () {
        const that = this;
        this.auth.deleteAuthentication().then(() => {
            that.setState({login: false});
        });
    }
    render () {
        let loginItem;
        if (!this.state.login) {
            loginItem = <LoginForm login={this.login.bind(this)} />;
        } else {
            loginItem = <LoginRestaurant restaurants={this.state.restaurants} loginDone={this.props.loginDone} logout={this.logout.bind(this)} />;
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

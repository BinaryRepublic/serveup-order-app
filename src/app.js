import React, { Component } from 'react';
import './assets/css/app.css';

import Restaurant from "./components/restaurant";
import Login from "./components/login";

import ServerConfig from './serverConfig';
import AuthStore from "./ro-webapp-helper/authentication/authStore";
import AuthController from "./ro-webapp-helper/authentication/authController";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: localStorage.getItem('restaurantId')
        };
        this.serverCfg = new ServerConfig();

        this.auth = new AuthController(this.serverCfg.authApi, this.serverCfg.orderApi);
        this.authStore = new AuthStore();

        // class binding
        this.loginDone = this.loginDone.bind(this);
        this.restaurantLogout = this.restaurantLogout.bind(this);
        this.logout = this.logout.bind(this);
    }

    loginDone (restaurantId) {
        localStorage.setItem('restaurantId', restaurantId);
        this.setState({restaurantId: restaurantId});
    }
    restaurantLogout () {
        localStorage.removeItem('restaurantId');
        this.setState({restaurantId: false});
    }
    logout () {
        const that = this;
        localStorage.removeItem('restaurantId');
        this.auth.deleteAuthentication().then(() => {
            that.setState({restaurantId: false});
        });
    }

    render() {
        if (this.state.restaurantId) {
            return (
                <Restaurant id={this.state.restaurantId}
                            restaurantLogout={this.restaurantLogout.bind(this)}
                            logout={this.logout.bind(this)} />
            );
        } else {
            return (
                <Login loginDone={this.loginDone}
                       logout={this.logout.bind(this)} />
            );
        }
    }
}

export default App;

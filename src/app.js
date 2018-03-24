import React, { Component } from 'react';
import './assets/css/app.css';

import Restaurant from "./components/restaurant";
import Login from "./components/login";
import AuthStore from "./library/authStore";
import AuthController from "./library/authController";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: localStorage.getItem('restaurantId')
        };

        this.auth = new AuthController();
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

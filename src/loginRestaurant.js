import React, { Component } from 'react';
import './assets/css/login.css';
import HttpHelper from "./library/httpHelper";

class LoginRestaurant extends Component {
    constructor () {
        super();
        this.http = new HttpHelper();

        // load restaurants
        this.http.get('http:')
    }
    render () {
        return (
            <div id="login-restaurant">

            </div>
        );
    }
}

export default LoginRestaurant

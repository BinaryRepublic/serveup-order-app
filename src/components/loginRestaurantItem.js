import React, { Component } from 'react';
import '../assets/css/login.css';

class LoginRestaurantItem extends Component {
    constructor () {
        super();
        this.loginDone = this.loginDone.bind(this);
    }
    loginDone () {
        this.props.loginDone(this.props.restaurant.id);
    }
    render () {
        return (
            <div className="login-restaurant-item" onClick={this.loginDone.bind(this)}>
                <p className="login-restaurant-item-name">{this.props.restaurant.name}</p>
                <p className="login-restaurant-item-address">{this.props.restaurant.city} - {this.props.restaurant.street}</p>
            </div>
        );
    }
}

export default LoginRestaurantItem

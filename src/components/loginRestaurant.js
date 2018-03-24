import React, { Component } from 'react';
import '../assets/css/login.css';
import LoginRestaurantItem from "./loginRestaurantItem";

class LoginRestaurant extends Component {
    render () {
        let restaurants = this.props.restaurants;
        let restaurantItems = [];
        for (let x = 0; x < restaurants.length; x++) {
            restaurantItems.push(<LoginRestaurantItem restaurant={restaurants[x]} loginDone={this.props.loginDone} key={x} />);
        }
        return (
            <div id="login-restaurant">
                <h1 id="login-restaurant-headline">Restaurants</h1>
                <div id="login-restaurant-logout" onClick={this.props.logout}>Logout</div>
                {restaurantItems}
            </div>
        );
    }
}

export default LoginRestaurant

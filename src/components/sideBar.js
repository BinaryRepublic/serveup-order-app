import React, { Component } from 'react';
import '../assets/css/sideBar.css';
import DataController from '../library/DataController';
import History from './history';

import logo from'../assets/logo-image.svg';


class SideBar extends Component {
    constructor(props) {
        super(props);
        this.dataController = new DataController();
    }

    render() {
        if (this.props.history === true) {
            var tables = []
            tables = this.dataController.structureOrderData(this.props.orders);
            return (
                <div>
                    <History tables={tables} changeToSideBar={this.props.changeToSideBar}/>
                </div>
            )
        } else {
            return (
                <div>
                    <img id="logo" src={logo}/>
                    <div id="nav-bar">
                        <div className="nav-bar-item" onClick={this.props.changeToHistory}>
                            History
                        </div>
                        <div className="nav-bar-item" onClick={this.props.restaurantLogout}>
                            Restaurants
                        </div>
                        <div className="nav-bar-item" onClick={this.props.logout}>
                            Logout
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SideBar;


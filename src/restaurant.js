import React, { Component } from 'react';
import './assets/css/app.css';
import OrderTable from './orderTable';
import SideBar from './sideBar';
import NavigationBar from './navigationBar';
import OrderApiHelper from './library/orderApiHelper'

import ServerConfig from './library/serverConfig';

const io = require('socket.io-client');

class Restaurant extends Component {
    constructor(props) {
        super(props);

        const cfg = new ServerConfig();

        this.state = {
            showSideBar: false,
            orders: [],
            history: false,
            restaurantId: localStorage.getItem('restaurantId')
        };
        const that = this;

        // connect to socket
        const socket = io(cfg.orderWorker);
        socket.on('connect', function(){
            if (this.state.restaurantId) {
                socket.emit("restaurantId", this.state.restaurantId);
            }
        });
        // handle new orders
        socket.on('neworder', function(order){
            console.log(order);
            order = JSON.parse(order);
            order.tableNumber = Math.floor(Math.random() * 10);
            var newState = that.state;
            newState.orders.push(order);
            that.setState(newState)
        });

        // load orders
        let orderApiHelper = new OrderApiHelper(cfg.orderApi, this.state.restaurantId);
        orderApiHelper.getOrders(0).then(result => {
            if (result) {
                for(var r = 0; r < result.length; r++) {
                    var order = result[r];
                    order.tableNumber = Math.floor(Math.random() * 10)
                }
                that.setState({orders: result})
            }
        }).catch(err => {
            console.log(err);
        });

        // class binding
        this.switchToOrderTable = this.switchToOrderTable.bind(this);
        this.switchToSideBar = this.switchToSideBar.bind(this);
        this.changeToHistory = this.changeToHistory.bind(this);
        this.changeToSideBar = this.changeToSideBar.bind(this);
    }

    switchToOrderTable() {
        this.setState({showSideBar : false });
    }
    switchToSideBar() {
        this.setState({history: false});
        this.setState({showSideBar : true });
    }
    changeToHistory() {
        this.setState({history: true});
    }
    changeToSideBar() {
        this.setState({history: false});
    }

    render() {
        return (
            <div className={this.state.showSideBar ? 'showSideBar' : '' }>
                <NavigationBar history={this.state.history} switchToOrderTable={this.switchToOrderTable} switchToSideBar={this.switchToSideBar} showSideBar={this.state.showSideBar}/>
                <div className="wrapper">
                    <div className="wrapper-SideBar">
                        <SideBar orders={this.state.orders}
                                 history={this.state.history}
                                 changeToHistory={this.changeToHistory}
                                 changeToSideBar={this.changeToSideBar}
                                 restaurantLogout={this.props.restaurantLogout}
                                 logout={this.props.logout} />
                    </div>
                    <div className="wrapper-OrderTable">
                        <OrderTable orders={this.state.orders}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Restaurant;

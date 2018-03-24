import React, { Component } from 'react';
import '../assets/css/app.css';
import OrderTable from './orderTable';
import SideBar from './sideBar';
import NavigationBar from './navigationBar';
import OrderApiHelper from '../library/orderApiHelper'

import ServerConfig from '../library/serverConfig';
import AuthController from "../library/authController";

const io = require('socket.io-client');

class Restaurant extends Component {
    constructor(props) {
        super(props);

        const auth = new AuthController();
        const cfg = new ServerConfig();

        this.state = {
            showSideBar: false,
            orders: [],
            history: false,
            restaurantId: localStorage.getItem('restaurantId')
        };
        const that = this;

        auth.getAccessToken().then(accessToken => {
            // connect to socket
            console.log(accessToken)
            const socket = io(cfg.orderWorker, { query: "token=" + accessToken });
            socket.on('connect', function(){
                if (that.state.restaurantId) {
                    socket.emit("restaurantId", that.state.restaurantId);
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
            // handle errors
            socket.on('err', function(err){
                console.log(err);
            });
        });


        // load orders
        let orderApiHelper = new OrderApiHelper(this.state.restaurantId);
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
                <NavigationBar history={this.state.history}
                               switchToOrderTable={this.switchToOrderTable}
                               switchToSideBar={this.switchToSideBar}
                               showSideBar={this.state.showSideBar} />
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

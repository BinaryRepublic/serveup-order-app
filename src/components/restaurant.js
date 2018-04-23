import React, { Component } from 'react';
import '../assets/css/app.css';
import OrderTable from './orderTable';
import SideBar from './sideBar';
import NavigationBar from './navigationBar';
import OrderApiHelper from '../library/orderApiHelper'

import ServerConfig from '../serverConfig';
import AuthController from "../ro-webapp-helper/authentication/authController";

const io = require('socket.io-client');

class Restaurant extends Component {
    constructor(props) {
        super(props);

        const cfg = new ServerConfig();
        const auth = new AuthController(cfg.authApi);

        this.state = {
            showSideBar: false,
            orders: [],
            historyOrders: [],
            history: false,
            restaurantId: localStorage.getItem('restaurantId')
        };
        const that = this;

        auth.getAccessToken().then(accessToken => {
            // connect to socket
            const socket = io(cfg.orderWorker, { query: "token=" + accessToken });
            socket.on('connect', function(){
                console.log('connected');
                if (that.state.restaurantId) {
                    socket.emit("restaurantId", that.state.restaurantId);
                }
            });
            // handle new orders
            socket.on('neworder', function(order){
                order = JSON.parse(order);
                console.log(order);
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
                that.setState({orders: result})
            }
        }).catch(err => {
            console.log(err);
        });

        // load history orders
        orderApiHelper.getOrders(1).then(result => {
            if (result) {
                that.setState({historyOrders: result})
            }
        }).catch(err => {
            console.log(err);
        });

        // class binding
        this.switchToOrderTable = this.switchToOrderTable.bind(this);
        this.switchToSideBar = this.switchToSideBar.bind(this);
        this.changeToHistory = this.changeToHistory.bind(this);
        this.changeToSideBar = this.changeToSideBar.bind(this);
        this.orderFinished = this.orderFinished.bind(this);
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

    orderFinished (orderId) {
        let newState = this.state;
        for (let x = 0; x < newState.orders.length; x++) {
            if (newState.orders[x].id === orderId) {
                newState.orders[x].status = 1;
                newState.historyOrders.push(newState.orders[x]);
                newState.orders.splice(x, 1);
                break;
            }
        }
        this.setState(newState);
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
                        <SideBar orders={this.state.historyOrders}
                                 history={this.state.history}
                                 changeToHistory={this.changeToHistory}
                                 changeToSideBar={this.changeToSideBar}
                                 restaurantLogout={this.props.restaurantLogout}
                                 logout={this.props.logout} />
                    </div>
                    <div className="wrapper-OrderTable">
                        <OrderTable orders={this.state.orders}
                                    historyOrders={this.state.historyOrders}
                                    orderFinished={this.orderFinished}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Restaurant;

import React, { Component } from 'react';
import './assets/css/app.css';
import OrderTable from './orderTable';
import SideBar from './sideBar';
import NavigationBar from './navigationBar';
import HttpHelper from './library/httpHelper';
const io = require('socket.io-client');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideBar: false,
            orders: [],
            history: false
        };
        const that = this;

        // -- init ports
        // -- should be dependent on ENV-Variables later!
        // PROD
        let orderApiPort = 3000;
        let orderWorkerPort = 9000;

        // STAGE
        if(window.location.port == 81) {
            orderApiPort = 3100;
            orderWorkerPort = 9100;
        }
        // DEV
        else if(window.location.port == 82 || window.location.port == 3000) {
            orderApiPort = 3200;
            orderWorkerPort = 9200;
        }

        let url = 'http://138.68.71.39:' + orderWorkerPort;
        const socket = io(url);
        socket.on('connect', function(){
            let restaurantId = http.findGetParameter("restaurant-id");
            if (restaurantId) {
                socket.emit("restaurantId", restaurantId);
            }
        });
        socket.on('neworder', function(order){
            console.log(order);
            order = JSON.parse(order);
            order.tableNumber = Math.floor(Math.random() * 10)
            var newState = that.state;
            newState.orders.push(order);
            that.setState(newState)
        });
        var http = new HttpHelper();
        http.getOrders(0, orderApiPort).then(result => {
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
                        <SideBar orders={this.state.orders} history={this.state.history} changeToHistory={this.changeToHistory} changeToSideBar={this.changeToSideBar}/>
                    </div>
                    <div className="wrapper-OrderTable">
                        <OrderTable orders={this.state.orders}/>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default App;
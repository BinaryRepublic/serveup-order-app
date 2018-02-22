import React, { Component } from 'react';
import './assets/css/app.css';
import OrderTable from './orderTable';
import SideBar from './sideBar';
import testdata from './test.json';
import NavigationBar from './navigationBar';
import HttpHelper from './library/httpHelper';
const io = require('socket.io-client');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideBar: false,
            orders: testdata,
            history: false
        }
        const that = this;
        // Should be implemented with ENV variable in future releases
        var port = 9000;
        if(window.location.port == 81) {
            port = 9100;
        }
        else if(window.location.port == 82) {
            port = 9200;
        }
        let url = 'http://138.68.71.39:' + port;
        const socket = io(url);
        socket.on('connect', function(){
            socket.emit("restaurantId", "b3ce8a59-5406-4cef-b1a5-b78b7d5ff0c6");
        });
        socket.on('neworder', function(order){
            console.log(order);
            order = JSON.parse(order);
            var newState = that.state;
            newState.orders.push(order);
            that.setState(newState)
        });
        var http = new HttpHelper();
        http.getOrders(0).then(result => {
            that.setState({orders: result})
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
      console.log(this.state.history)
    }
    switchToSideBar() {
        this.setState({history: false});
        this.setState({showSideBar : true });
    }
    changeToHistory() {
        this.setState({history: true})
    }
    changeToSideBar() {
        this.setState({history: false})
    }

    render() {
        return (
            <div className={this.state.showSideBar ? 'showSideBar' : '' }>
                <NavigationBar switchToOrderTable={this.switchToOrderTable} switchToSideBar={this.switchToSideBar} showSideBar={this.state.showSideBar} history={this.state.history}/>
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
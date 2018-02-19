import React, { Component } from 'react';
import './assets/css/app.css';
import OrderTable from './orderTable';
// import History from './history';
import SideBar from './sideBar';
// import DataController from './DataController';
import testdata from './test.json';
import NavigationBar from './navigationBar';
const io = require('socket.io-client');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideBar: false,
            orders: testdata 
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
        const socket = io('http://138.68.71.39:' + port);
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

        this.switchToOrderTable = this.switchToOrderTable.bind(this);
        this.switchToSideBar = this.switchToSideBar.bind(this);
    }

    switchToOrderTable() {
      this.setState({showSideBar : false });
    }
    switchToSideBar() {
        this.setState({showSideBar : true });
    }

    render() {
        console.log(this.state.orders);
        return (
            <div className={this.state.showSideBar ? 'showSideBar' : '' }>
                <NavigationBar switchToOrderTable={this.switchToOrderTable} switchToSideBar={this.switchToSideBar} showSideBar={this.state.showSideBar}/>
                <div className="wrapper">
                    <div className="wrapper-SideBar">
                        <SideBar/>
                    </div>
                    <div className="wrapper-OrderTable">
                        <OrderTable orders={this.state.orders}/>
                    </div>
                </div>
            </div>
        ); 

        // let dataController = new DataController();
        // var tables = dataController.structureOrderData(this.state.orders);
        // return (
        //     <div>
        //         <button onClick={this.showOrderTable}>Order Table</button>
        //         <History tables={tables}/>
        //     </div>
        // );
    }
}

export default App;
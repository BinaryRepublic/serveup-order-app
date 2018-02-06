import React, { Component } from 'react';
import './assets/css/app.css';
import OrderTable from './orderTable';
// import History from './history';
import NavigationBar from './navigationBar';
import DataController from './DataController';
import testdata from './test.json';
import io from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 0,
            orders: testdata     
        }
        
        const socket = io('http://138.68.71.39:9000');
        socket.on('connect', function(){
            socket.emit("restaurantId", "abc123");
        });
        socket.on('neworder', function(order){
            console.log(order);
        });

        this.showOrderTable = this.showOrderTable.bind(this);
        this.showNavigation = this.showNavigation.bind(this);
    }
    showOrderTable() {
      this.setState({display:0});
    }
    showNavigation() {
        this.setState({display:1});
    }

    render() {
        if(this.state.display === 0) {
            return (
                <div>
                    <OrderTable orders={this.state.orders} showNavigation={this.showNavigation} display={this.state.display}/>
                </div>
            );
        } 
        else if(this.state.display === 1) {

            return (
                    <div>
                        <NavigationBar showOrderTable={this.showOrderTable}/>
                    </div>
            )
            // let dataController = new DataController();
            // var tables = dataController.structureOrderData(this.state.orders);
            // return (
            //     <div>
            //         <button onClick={this.showOrderTable}>Order Table</button>
            //         <History tables={tables}/>
            //     </div>
            // );
        } 
        else {
            return (
                <div></div>
            );
        }
    }
}

export default App;
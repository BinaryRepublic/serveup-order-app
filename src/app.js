import React, { Component } from 'react';
import './assets/css/app.css';
import OrderTable from './orderTable';
import History from './history';
import DataController from './DataController';
import testdata from './test.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display:0,
            orders: testdata     
        }
      this.showOrderTable = this.showOrderTable.bind(this);
      this.showHistory = this.showHistory.bind(this);
    }
    showOrderTable() {
      this.setState({display:0});
    }
    showHistory() {
        this.setState({display:1});
    }

    render() {
        if(this.state.display === 0) {
            return (
                <div>
                    <button onClick={this.showHistory}>History</button>
                    <OrderTable orders={this.state.orders}/>
                </div>
            );
        } 
        else if(this.state.display === 1) {
            let dataController = new DataController();
            var tables = dataController.structureOrderData(this.state.orders);
            return (
                <div>
                    <button onClick={this.showOrderTable}>Order Table</button>
                    <History tables={tables}/>
                </div>
            );
        } 
        else {
            return (
                <div></div>
            );
        }
    }
}

export default App;
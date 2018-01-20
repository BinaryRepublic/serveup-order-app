import React, { Component } from 'react';
import './assets/css/app.css';
import OrderTable from './orderTable';
import History from './history';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display:0,
            orders: 
            [
                {
                    "status" : 0,
                    "timestamp" :  1516449942856,
                    "tableNumber": 5,
                    "items": [
                        {
                            "name": "Cola",
                            "count": 2
                        },
                        {
                            "name": "Fanta",
                            "count": 2
                        },
                        {
                            "name": "Apfelschorle",
                            "count": 2
                        },
                        {
                            "name": "Wein",
                            "count": 2
                        }  
                    ]
                }
            ]       
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
            return (
                <div>
                    <button onClick={this.showOrderTable}>Order Table</button>
                    <History/>

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
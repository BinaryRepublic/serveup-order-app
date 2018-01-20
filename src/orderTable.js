import React, { Component } from 'react';
import './assets/css/orderTable.css';
import OrderItem from './orderItem';

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: this.props.orders                                    
        }

        this.add = this.add.bind(this);
        this.orderFinished = this.orderFinished.bind(this);
        this.orderError = this.orderError.bind(this);


    }
   
    add () {
        var plus = this.state.orders;
        var timestamp = Date.now();
        var neworder = {
            "status": 0,
            "timestamp": timestamp,
            "tableNumber": 9,
            "items": [
                {
                    "name": "Weizen", 
                    "count": 4
                },
                {
                    "name": "Apfelschorle",
                    "count": 10
                },
                {
                    "name": "Fanta",
                    "count": 2
                },
                {
                    "name": "Sekt",
                    "count": 2
                },
                {
                    "name": "Mojito",
                    "count": 2
                },
                {
                    "name": "Wasser",
                    "count": 2
                }
            ]
        }
    plus.push(neworder);
    this.setState({orders: plus})
    }

    orderFinished (order) {
        order.status = 1;
        this.forceUpdate()
    }

    orderError (order) {
        order.status = 2;
        this.forceUpdate()
    }

    render () {
        var orderElements = [];
        for (var i = 0; i < this.state.orders.length; i++) { 
            var order = this.state.orders[i]
            console.log(order)
            if (this.props.history) {
                if (order.status > 0) {
                    orderElements.push(<OrderItem key={order.timestamp} index={i} buttonClicked={this.orderError} order={order}/>);
                }   
            } else {

                if (order.status === 0) {
                    orderElements.push(<OrderItem key={order.timestamp} index={i} buttonClicked={this.orderFinished} order={order}/>);
                } 
            }
           
        }

        var tableNumberColumn;
        if (!this.props.history) {
            tableNumberColumn = <th> Tischnummer</th>
        } 

        return (
            <div>
                <button onClick={this.add}>Add New</button>

                <table> 
                    <tbody>                                    
                        <tr>
                            <th> Uhrzeit</th>
                            {tableNumberColumn}
                            <th> Getränk</th>
                            <th> Anzahl</th>
                            <th> </th>
                        </tr>  
                        {orderElements}
                    </tbody>                                                  
                </table>
            </div>
        )
    }
}

export default OrderTable;

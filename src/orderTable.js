import React, { Component } from 'react';
import './css/orderTable.css';
import OrderItem from './orderItem';


class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: 
                [
                    {
                        "timestamp" :  12.34,
                        "tableNumber": 5,
                        "items": [
                            {
                                "name": "Cola",
                                "count": 2
                            },
                            {
                                "name": "Zweites Getränk",
                                "count": 2
                            },
                            {
                                "name": "Drittes Getränk",
                                "count": 2
                            },
                            {
                                "name": "Viertes Getränk",
                                "count": 2
                            }
                            
                        ]
                    }
                ],
            newOrder: {
                "timestamp": 14.11,
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
        }
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);

    }

    add () {
    var plus = this.state.orders
    plus.push(this.state.newOrder);
    this.setState({orders: plus})
    }

    remove (orderToRemove) {  
        var arr = this.state.orders 
        var index = arr.indexOf(orderToRemove)                                                                                                                             
        arr.splice(index, 1);
        this.setState({orders: arr})
    }
        
    render () {
        var orderElements = [];
        console.log(this.state.orders)
        for (var i = 0; i < this.state.orders.length; i++) {
            orderElements.push(<OrderItem key={i} onDelete={this.remove} order={this.state.orders[i]}/>);
        }

        return (
            <div>
                <button onClick={this.add}>Add New</button>

                <table> 
                    <tbody>                                    
                        <tr>
                            <th> Uhrzeit</th>
                            <th> Tischnummer</th>
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

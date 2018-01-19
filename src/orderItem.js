import React, { Component } from 'react';
import './css/orderItem.css';



class OrderItem extends Component {
    constructor(props) {
        super(props);
         
    }

    removeItem () {
        this.props.onDelete(this.props.order)
    }
    
    render () {

        var orderDrink = [];
        var orderCount = [];
        for (var i = 0; i < this.props.order.items.length; i++) {
            orderDrink.push(<div key={i}>{this.props.order.items[i].name} </div>);
            orderCount.push(<div key={i}>{this.props.order.items[i].count}</div>);
        }

        return (

                <tr>
                    <td>{this.props.order.timestamp} Uhr  </td>       
                    <td>{this.props.order.tableNumber} </td>
                    <td>{orderDrink}</td>    
                    <td>{orderCount} </td>  
                    <td><button onClick={this.removeItem.bind(this)}>Delete</button></td> 
                                     
                </tr> 
        )
    }
}

export default OrderItem;
import React, { Component } from 'react';
import './assets/css/orderItem.css';
import iconDone from './assets/done.png'
import iconError from './assets/error.jpg'

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.order
        } 
    this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked () {
        this.props.buttonClicked(this.state.order)
    }

    render () {

        var orderDrink = [];
        var orderCount = [];
        for (var i = 0; i < this.state.order.items.length; i++) {
            orderDrink.push(<div key={i}>{this.state.order.items[i].name} </div>);
            orderCount.push(<div key={i}>{this.state.order.items[i].count}</div>);
        }
        var button 

        if (this.state.order.status < 2) {
            var icon;
            if (this.state.order.status === 0) {
                icon = iconDone;
            } else {
                icon = iconError;
            }
            button= <img className="done-button" src={icon} alt={"icon"} onClick={this.buttonClicked.bind(this)} />
        }

        var tableNumberValue;
        if (!this.props.history) {
            tableNumberValue = <td>{this.state.order.tableNumber}</td>
        } 

        return (
            <tr>
                <td>{this.state.order.timestamp} Uhr  </td>  
                {tableNumberValue}     
                <td>{orderDrink}</td>    
                <td>{orderCount} </td>  
                <td>{button}</td>
            </tr> 
        ) 
    }
}

export default OrderItem;


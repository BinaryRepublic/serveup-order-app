import React, { Component } from 'react';
import './assets/css/orderItemLine.css';

class OrderItemLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.order
        } 
    }

    render () {
        var orderItemLine = [];
        for (var i = 0; i < this.state.order.items.length; i++) {
            orderItemLine.push(<div className="orderDrinkLine" key={i}>{this.state.order.items[i].nb} &nbsp; {this.state.order.items[i].name}</div>);
        }
    
        return (
            <div>
            {orderItemLine}
           </div>
        ) 
    }
}

export default OrderItemLine;


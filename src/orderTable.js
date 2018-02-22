import React, { Component } from 'react';
import './assets/css/orderTable.css';
import OrderItem from './orderItem';

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.orderFinished = this.orderFinished.bind(this);
    }

    orderFinished (order) {
        order.status = 1;
        this.forceUpdate()
        console.log(order.status)
    }

    render () {
        var orderElements = [];
        for (var i = 0; i < this.props.orders.length; i++) { 
            var order = this.props.orders[i]
            if (order.status === 0) {
                orderElements.push(<OrderItem key={order.timestamp} index={i} buttonClicked={this.orderFinished} order={order} history={this.props.history}/>);
            } 
        }
        return (
            <div className="container">
                {orderElements}
            </div>
        )
    }
}

export default OrderTable;

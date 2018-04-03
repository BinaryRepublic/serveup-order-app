import React, { Component } from 'react';
import '../assets/css/orderTable.css';
import OrderItem from './orderItem';

class OrderTable extends Component {
    render () {
        var orderElements = [];
        for (var i = 0; i < this.props.orders.length; i++) {
            var order = this.props.orders[i]
            orderElements.push(<OrderItem key={order.timestamp} index={i} buttonClicked={this.props.orderFinished} order={order} history={this.props.history}/>);
        }
        return (
            <div className="container">
                {orderElements}
            </div>
        )
    }
}

export default OrderTable;

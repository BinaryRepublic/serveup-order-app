import React, { Component } from 'react';
import './assets/css/historyOrderItem.css';

class HistoryOrderItem extends Component {
    
    render () {

        var today = new Date(this.props.order.timestamp);
        var h = today.getHours();
        var m = today.getMinutes();

        if(h<10) {
            h = '0'+h
        } 
        if(m<10) {
            m = '0'+m
        } 
        today = h + ':' + m;

        var historyOrderItemLine = [];
        for (var i = 0; i < this.props.order.items.length; i++) 
        {
            historyOrderItemLine.push(<div key={i}>{this.props.order.items[i].count} &nbsp; {this.props.order.items[i].name}</div>);
        }
    
        return (
            <div className={this.props.order.status === 2 ? 'order-error-color' : ''}>
                <div className="history-order-item">
                    <div className="order-time">{today}</div>
                    <div className="history-order-item-line">
                        {historyOrderItemLine}
                    </div>
                    <i className="ion-alert icon-error" onClick={this.props.orderError.bind(this, this.props.order)}></i>
                </div>
           </div>
        ) 
    }   
}

export default HistoryOrderItem;



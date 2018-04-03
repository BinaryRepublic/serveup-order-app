import React, { Component } from 'react';
import '../assets/css/historyOrderItem.css';

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
        var key = 0;
        console.log(this.props.order.drinks)
        for (var i = 0; i < this.props.order.drinks.length; i++) {
            historyOrderItemLine.push(<div key={key}>{this.props.order.drinks[i].nb} &nbsp; {this.props.order.drinks[i].name}</div>);
            key++;
        }
        console.log(this.props.order.services)
        for (var i = 0; i < this.props.order.services.length; i++) {
            historyOrderItemLine.push(<div key={key}>{this.props.order.services[i].name}</div>);
            key++;
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



import React, { Component } from 'react';
import '../assets/css/orderItem.css';
import OrderItemLine from './orderItemLine';
import OrderApiHelper from '../library/orderApiHelper'

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.order,
            close: false
        };
        this.myEndFunction = this.myEndFunction.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    myEndFunction() {
        this.props.buttonClicked(this.state.order);
    }

    buttonClicked (orderId) {
        var x = document.querySelector(".parent[data-id='" + orderId + "']");
        x.style.animation = "parent 0.2s";
        x.addEventListener("animationend", this.myEndFunction);
        var orderApi = new OrderApiHelper();
        orderApi.updateOrderStatus(orderId, 1);
    }

    render () {

        var tableNumberValue;
        if (!this.props.history) {
            tableNumberValue = <div className="tableNumberValue" >{this.state.order.tableNumber}</div>
        }

        var today = new Date(this.state.order.timestamp);
        var h = today.getHours();
        var m = today.getMinutes();

        if(h<10) {
            h = '0'+h
        }
        if(m<10) {
            m = '0'+m
        }
        today = h + ':' + m;

        return (
            <div className={this.state.close ? 'closeOrderItem' : '' }>
                <div className="parent" data-id={this.state.order.id}>
                    <div className="div-left">
                        {tableNumberValue}
                    </div>

                    <div className="div-center">

                        <OrderItemLine order={this.state.order}/>

                        <div className="timestamp">
                            {today}
                        </div>
                    </div>

                    <div className="div-right" onClick={this.buttonClicked.bind(this, this.state.order.id)}>
                        <i className="ion-checkmark check-icon"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderItem;


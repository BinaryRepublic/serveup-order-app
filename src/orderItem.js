import React, { Component } from 'react';
import './assets/css/orderItem.css';
import OrderItemLine from './orderItemLine';

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.order,
            close: false,
        } 
    this.buttonClicked = this.buttonClicked.bind(this);
    this.myEndFunction = this.myEndFunction.bind(this);

    }


    myEndFunction() {
        this.props.buttonClicked(this.state.order);
    }
   
    buttonClicked (orderId) {
        var x = document.querySelector(".parent[data-id='" + orderId + "']");
        x.style.animation = "parent 0.2s";
        x.addEventListener("animationend", this.myEndFunction);
    }

    // Code for Chrome, Safari and Opera
    // x.addEventListener("webkitAnimationEnd", myEndFunction);

    // Standard syntax
    // x.addEventListener("animationend", myEndFunction);

    render () {

        // var orderDrink = [];
        // var orderCount = [];
        // for (var i = 0; i < this.state.order.items.length; i++) {
        //     orderDrink.push(<div className="orderDrink" key={i}>{this.state.order.items[i].name} </div>);
        //     orderCount.push(<div className="orderCount" key={i}>{this.state.order.items[i].count}</div>);
        // }

        var tableNumberValue;
        if (!this.props.history) {
            tableNumberValue = <div className="tableNumerValue" >{this.state.order.tableNumber}</div>
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
                        <div className="timestamp">{today}</div>
                    </div>
                    <div className="div-right">
                        <i className="ion-checkmark check-icon" onClick={this.buttonClicked.bind(this, this.state.order.id)}></i>
                    </div>
                </div>
            </div>

            /* <div class="tr">
                <div class="td">{this.state.order.timestamp} Uhr  </div>  
                {tableNumberValue}     
                <div class="td order">{orderDrink}</div>    
                <div class="td">{orderCount} </div>  
                <div class="td orderbutton">{button}</div>
            </div>  */

            // {this.state.order.timestamp} Uhr 
        ) 
    }
}

export default OrderItem;


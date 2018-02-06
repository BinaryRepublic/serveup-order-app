import React, { Component } from 'react';
import './assets/css/orderItem.css';
import OrderItemLine from './orderItemLine';

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.order,
        } 
    this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked () {
        this.props.buttonClicked(this.state.order)
    }

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

        return (
            <div className="parent">

                <div className="div-left">
                    {tableNumberValue}
                </div>
                <div className="div-center">
                    <OrderItemLine order={this.state.order}/>
                    <div className="timestamp">{this.state.order.timestamp} Uhr  </div>
                </div>
                <div className="div-right">
                    <i className="ion-checkmark check-icon" onClick={this.buttonClicked.bind(this)}></i>
                </div>

            </div>
            /* <div class="tr">
                <div class="td">{this.state.order.timestamp} Uhr  </div>  
                {tableNumberValue}     
                <div class="td order">{orderDrink}</div>    
                <div class="td">{orderCount} </div>  
                <div class="td orderbutton">{button}</div>
            </div>  */
        ) 
    }
}

export default OrderItem;


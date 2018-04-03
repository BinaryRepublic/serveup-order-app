import React, { Component } from 'react';
import '../assets/css/orderItemLineCategory.css';

class OrderItemLineCategory extends Component {
    render () {
        var items = []
        for (var i = 0; i < this.props.items.length; i++) {
            if (this.props.type === 'drink') {
                items.push(<div className="orderItemLineCategory drink" key={i}>{this.props.items[i].nb} &nbsp; {this.props.items[i].name} &nbsp; {this.props.items[i].size}ml </div>)
            } else {
                items.push(<div className="orderItemLineCategory service" key={i}>{this.props.items[i]}</div>);
            }
        }
        return (
            <div>
                <div className="orderDrinkLineName">
                    {this.props.name}
                </div>
                {items}
           </div>
        )
    }
}

export default OrderItemLineCategory;

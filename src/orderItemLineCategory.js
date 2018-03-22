import React, { Component } from 'react';
import './assets/css/orderItemLineCategory.css';

class OrderItemLineCategory extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        var items = []
        for (var i = 0; i < this.props.items.length; i++) {
            items.push(<div className="orderDrinkLineCategory" key={i}>{this.props.items[i].nb} &nbsp; {this.props.items[i].name} &nbsp; {this.props.items[i].size}ml </div>)
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








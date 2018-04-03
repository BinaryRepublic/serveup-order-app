import React, { Component } from 'react';
import '../assets/css/orderItemLineCategory.css';

class OrderItemLineCategory extends Component {
    render () {
        var items = []
        for (var i = 0; i < this.props.drinks.length; i++) {
            items.push(<div className="orderDrinkLineCategory" key={i}>{this.props.drinks[i].nb} &nbsp; {this.props.drinks[i].name} &nbsp; {this.props.drinks[i].size}ml </div>)
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








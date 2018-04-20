import React, { Component } from 'react';
import '../assets/css/orderItemLine.css';
import OrderItemLineCategory from './orderItemLineCategory';


class OrderItemLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.order
        }
    }

    render () {
        var orderItems = []
        var result = []

        if (this.state.order.drinks.length) {
            var categories = ["softdrinks", "bier", "wein", "cocktails", "schnaps", "heissgetränke"]

            for (var i = 0; i < categories.length; i++) {
                for (var j = 0; j < this.state.order.drinks.length; j++ ) {
                    if (categories.indexOf(this.state.order.drinks[j].category) === -1) {
                        categories.push(this.state.order.drinks[j].category)
                    }
                    if (this.state.order.drinks[j].category === categories[i]) {
                        if (!orderItems.length || orderItems[orderItems.length-1].category !== categories[i]) {
                            orderItems.push({
                                type: 'drink',
                                category: categories[i],
                                items: []
                            })
                        }
                        orderItems[orderItems.length-1].items.push(this.state.order.drinks[j])
                    }
                }
            }
        }
        if (this.state.order.services.length) {
            let serviceItems = [];
            this.state.order.services.forEach(item => {
                serviceItems.push(item.name);
            });
            orderItems.push({
                type: 'service',
                category: 'Servicewünsche',
                items: serviceItems
            });
        }
        for (var k = 0; k < orderItems.length; k++ ){
            result.push(<OrderItemLineCategory name={orderItems[k].category} type={orderItems[k].type} items={orderItems[k].items} key={k} index={k}/>);
        }
        return (
            <div>
                {result}
           </div>
        )
    }
}

export default OrderItemLine;








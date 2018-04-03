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
        var categories = ["softdrinks", "bier", "wein", "schnaps", "heissgetränke"]
        var array = []
        var result = []

        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < this.state.order.drinks.length; j++ ) {
                if (categories.indexOf(this.state.order.drinks[j].category) === -1) {
                    categories.push(this.state.order.drinks[j].category)
                }
                if (this.state.order.drinks[j].category === categories[i]) {
                    if (!array.length || array[array.length-1].category !== categories[i]) {
                        array.push({
                            category: categories[i],
                            drinks: []
                        })
                    }
                    array[array.length-1].drinks.push(this.state.order.drinks[j])
                }
            }
        }

        for (var k = 0; k < array.length; k++ ){
            result.push(<OrderItemLineCategory name={array[k].category} drinks={array[k].drinks} key={k} index={k}/>);
        }
        return (
            <div>
                {result}
           </div>
        )
    }
}

export default OrderItemLine;








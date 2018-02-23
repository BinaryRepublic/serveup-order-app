import React, { Component } from 'react';
import './assets/css/history.css';
import HistoryTableItem from './historyTableItem';
import HistoryOrderItem from './historyOrderItem';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTable: undefined
        }
        this.selectTable = this.selectTable.bind(this);
        this.changeSelectedTable = this.changeSelectedTable.bind(this);
        this.orderError = this.orderError.bind(this);
    }

    selectTable(table) {
        this.setState({selectedTable: table})
    }

    changeSelectedTable() {
        this.setState({selectedTable: undefined})
    }

    orderError (order) {
        if (order.status === 1)
        {
            order.status = 2
        } else 
        {
            order.status = 1
        }
        this.forceUpdate()
    }

    selectionSort(array, key, orderDirection) {
        var length = array.length;
        for (var i = 0; i < length - 1; i++) // Number of passes
        { 
            var minMax = i; // minMax holds the current minimum / maximum number position for each pass; i holds the Initial minMax number
            for (var j = i + 1; j < length; j++) // Note that j = i + 1 as we only need to go through unsorted array
            { 
                var currentItem = array[j][key];
                var minMaxItem = array[minMax][key];

                if (orderDirection === "upwards")
                {
                    currentItem = new Date(currentItem).getTime();
                    minMaxItem = new Date(minMaxItem).getTime();
                }

                if (orderDirection === "downwards")
                {
                    if (currentItem < minMaxItem) // Compare the numbers
                    { 
                        minMax = j; //Change the current minMax number position if a smaller / greater num is found
                    }
                }
                else
                {
                    if (currentItem > minMaxItem) 
                    { 
                        minMax = j;
                    }
                }
            }
            if (minMax !== i) // After each pass, if the current minMax num != initial minMax num, exchange the position.
            { 
                var tmp = array[i]; // Swap the numbers ...
                array[i] = array[minMax];
                array[minMax] = tmp;
            }
        }
        return array;
    }

    render() {
        var tables = this.selectionSort(this.props.tables, "tableNumber", "downwards");
    
        if (this.state.selectedTable === undefined) 
        {
            var tableElements = [];
            for (var i = 0; i < tables.length; i++) 
            { 
                var table = tables[i]
                tableElements.push(<HistoryTableItem table={table} selectTable={this.selectTable} key={i} index={i}/>);
            }
            return (
                <div className="container-history">
                    <div onClick={this.props.changeToSideBar} className="history-header-back-feed">
                        <i className="ion-arrow-left-b icon-back"></i>
                        <div className="history-header-title">
                            History
                        </div>
                    </div>
                    <div className="history-order-items">
                    {tableElements}
                    </div>
                </div>
            )

        } else 
        {
            var orders = this.selectionSort(this.state.selectedTable.orders, "timestamp", "upwards");

            var historyOrderElements = [];
            for (var j = 0; j < orders.length; j++) 
            { 
                var order = orders[j]
                if (order.status > 0) 
                {
                    historyOrderElements.push(<HistoryOrderItem order={order} key={j} index={j} orderError={this.orderError}/>);
                }
            }
            return (
                <div className="container-history-items">
                    <div onClick={this.changeSelectedTable} className="history-header-back-table">
                        <i className="ion-arrow-left-b icon-back"></i>
                        <div className="history-header-title">
                            Table {this.state.selectedTable.tableNumber}
                        </div>
                    </div>
                    <div className="history-order-items">
                    {historyOrderElements}
                    </div>
                </div>
            )
        }
    }
}

export default History;


 
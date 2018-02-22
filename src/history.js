import React, { Component } from 'react';
import './assets/css/history.css';
import HistoryItem from './historyItem';
import HistoryOrderItem from './historyOrderItem';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTable: undefined
        }
        this.changeSelectedTable = this.changeSelectedTable.bind(this);
        this.selectTable = this.selectTable.bind(this);
        this.orderError = this.orderError.bind(this);
    }

    selectTable(table) {
        this.setState({selectedTable: table})
    }

    changeSelectedTable() {
        this.setState({selectedTable: undefined})
    }

    orderError (order) {
        if(order.status === 1){
            order.status = 2
        } else {
            order.status = 1
        }
        this.forceUpdate()
    }

    selectionSort(tables) {
        console.log(tables)
        var length = tables.length;
        
        for (var i = 0; i < length - 1; i++) {
            //Number of passes
            var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
            for (var j = i + 1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
                if (tables[j].tableNumber < tables[min].tableNumber) { //Compare the numbers
                    min = j; //Change the current min number position if a smaller num is found
                }
            }
            if (min !== i) {
                //After each pass, if the current min num != initial min num, exchange the position.
                //Swap the numbers 
                var tmp = tables[i];
                tables[i] = tables[min];
                tables[min] = tmp;
            }
        }
        console.log(tables)
        return tables;
    }

    render() {

        var tables = this.selectionSort(this.props.tables);
    
        if (this.state.selectedTable === undefined) {
            var tableElements = [];
            for (var i = 0; i < tables.length; i++) { 
                var table = tables[i]
                tableElements.push(<HistoryItem table={table} selectTable={this.selectTable} key={i} index={i}/>);
            }

            return (
                <div className="container-history">
                    <div onClick={this.props.changeToSideBar} className="history-header-back">
                        <i className="ion-arrow-left-b back-icon"></i>
                        <div className="table-number">
                            History
                        </div>
                    </div>
                    <div className="margin-top">
                    {tableElements}
                    </div>
                </div>
            )

        } else {
            console.log(this.state.selectedTable)
            var historyOrderElements = [];
            for (var j = 0; j < this.state.selectedTable.orders.length; j++) { 
                var order = this.state.selectedTable.orders[j]
                if (order.status > 0) {
                    historyOrderElements.push(<HistoryOrderItem order={order} key={i} index={i} orderError={this.orderError}/>);
                }
            }
            return (
                <div className="container-history-items">
                    <div onClick={this.changeSelectedTable} className="history-table-header-back">
                        <i className="ion-arrow-left-b back-icon"></i>
                        <div className="table-number">
                            Table {this.state.selectedTable.tableNumber}
                        </div>
                    </div>
                    <div className="margin-top">
                    {historyOrderElements}
                    </div>
                </div>
            )
        }
    }
}

export default History;

// key={order.timestamp} index={i} buttonClicked={this.orderError}

//        var tableElements = [];
// for (var i = 0; i < this.state.tables.length; i++) { 
//     var table = this.state.tables[i]
//     tableElements.push(<HistoryItem table={table} selectTable={this.selectTable} key={i} index={i}/>);
// }


 
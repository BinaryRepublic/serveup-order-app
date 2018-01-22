import React, { Component } from 'react';
import './assets/css/history.css';
import OrderTable from './orderTable';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTable: undefined,
            tables: props.tables     
        }

        this.changeSelectedTable = this.changeSelectedTable.bind(this);
    }

    selectTable (table) {
        this.setState({selectedTable: table})
    }

    changeSelectedTable () {
        this.setState({selectedTable: undefined})
    }

    render() {

        if (this.state.selectedTable === undefined) {
            var tableElements = [];
            for (var i = 0; i < this.state.tables.length; i++) { 
                var table = this.state.tables[i]
                tableElements.push(<button key={table.tableNumber} onClick={this.selectTable.bind(this, table)} >{table.tableNumber}</button>);
            }
            return (
                <div>
                    {tableElements}
                </div>
            )
        } else {
            return (
                <div>
                <p>Tischnummer {this.state.selectedTable.tableNumber}</p>
                <button onClick={this.changeSelectedTable} >Zurück</button>
                <OrderTable history={true} orders={this.state.selectedTable.orders} />
                </div>
            )
        }
    }
}

export default History;
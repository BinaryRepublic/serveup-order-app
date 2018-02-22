import React, { Component } from 'react';
import './assets/css/historyItem.css';

class HistoryItem extends Component {

    render () {
        return(
            <div className="history-item" key={this.props.table.tableNumber} onClick={this.props.selectTable.bind(this, this.props.table)}>
                <p className="table-name">
                Table {this.props.table.tableNumber}
                </p>
            </div>
        )
    }   
}

export default HistoryItem;


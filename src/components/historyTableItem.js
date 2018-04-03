import React, { Component } from 'react';
import '../assets/css/historyTableItem.css';

class HistoryTableItem extends Component {

    render () {
        return(
            <div className="history-item" key={this.props.table.tableNb} onClick={this.props.selectTable.bind(this, this.props.table)}>
                <p className="table-name">
                    Table {this.props.table.tableNb}
                </p>
            </div>
        )
    }
}

export default HistoryTableItem;


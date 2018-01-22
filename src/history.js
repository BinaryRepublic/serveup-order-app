import React, { Component } from 'react';
import './assets/css/history.css';
import OrderTable from './orderTable';



class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTable: undefined,
            tables: 
            [
                {
                    "tableId" :  "d7as6d8a7s6da87",
                    "tableNumber": 5,
                    "orders": [
                        {
                            "status": 0,
                            "timestamp":7868768768,
                            "items": [
                                {
                                    "name": "Cola",
                                    "count": 2
                                },
                                {
                                    "name": "Fanta",
                                    "count": 2
                                },
                                {
                                    "name": "Bier",
                                    "count": 2
                                },
                                {
                                    "name": "Wein",
                                    "count": 2
                                }  
                            ]
                        },
                        {
                            "status": 1,
                            "timestamp":78687687684,
                            "items": [
                                {
                                    "name": "Cola",
                                    "count": 2
                                },
                                {
                                    "name": "Fanta",
                                    "count": 2
                                },
                                {
                                    "name": "Bier",
                                    "count": 2
                                },
                                {
                                    "name": "Wein",
                                    "count": 2
                                }  
                            ]
                        },
                        {
                            "status": 2,
                            "timestamp":78687687688,
                            "items": [
                                {
                                    "name": "Cola",
                                    "count": 2
                                },
                                {
                                    "name": "Fanta",
                                    "count": 2
                                },
                                {
                                    "name": "Bier",
                                    "count": 2
                                },
                                {
                                    "name": "Wein",
                                    "count": 2
                                }  
                            ]
                        }
                    ]
                },
                {
                    "tableId" :  "q34ho8awhfiaf",
                    "tableNumber": 6,
                    "orders": [
                        {
                            "timestamp":34523453,
                            "items": [
                                {
                                    "name": "Sprite",
                                    "count": 2
                                },
                                {
                                    "name": "Fanta",
                                    "count": 2
                                },
                                {
                                    "name": "Bier",
                                    "count": 2
                                },
                                {
                                    "name": "Wein",
                                    "count": 2
                                }  
                            ]
                        }
                    ]
                },
                {
                    "tableId" :  "fq43ifhwoirhf",
                    "tableNumber": 9,
                    "orders": [
                        {
                            "timestamp":56785678567,
                            "items": [
                                {
                                    "name": "Wasser",
                                    "count": 2
                                },
                                {
                                    "name": "Fanta",
                                    "count": 2
                                },
                                {
                                    "name": "Bier",
                                    "count": 2
                                },
                                {
                                    "name": "Wein",
                                    "count": 2
                                }  
                            ]
                        }
                    ]
                }
            ]       
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
                // console.log(table);
                tableElements.push(<button key={table.tableId} onClick={this.selectTable.bind(this, table)} >{table.tableNumber}</button>);

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
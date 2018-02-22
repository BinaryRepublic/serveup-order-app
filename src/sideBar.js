import React, { Component } from 'react';
import './assets/css/sideBar.css';
import DataController from './DataController';
import History from './history';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.dataController = new DataController();
    }

    render() {

        if (this.props.history === true) {
            var tables = []
            tables = this.dataController.structureOrderData(this.props.orders.slice());
            return (
                <div>
                    <History tables={tables} changeToSideBar={this.props.changeToSideBar}/>
                </div>
            ) 
        } else {
            return (
                <div>
                    <div className="feed-heading">
                        Feed
                    </div>
                    <div className="parent2">
                        <div className="feed-item test-color">
                            <div className="feed-item-text test-color">T12: Rechnung</div>
                            <div className="timestamp-feed test-color">
                                8: 51
                            </div>
                        </div>
                        <div className="feed-item">
                            <div className="feed-item-text">T04: Kellner</div>
                            <div className="timestamp-feed">
                                8: 53
                            </div>
                        </div>
                        <div className="feed-item">
                            <div className="feed-item-text">T03: Rechnung</div>
                            <div className="timestamp-feed">
                                8: 53
                            </div>
                        </div>
                        <div className="feed-item">
                            <div className="feed-item-text">T01: Kellner</div>
                            <div className="timestamp-feed">
                                8: 54
                            </div>
                        </div>
                        <div className="feed-item">
                            <div className="feed-item-text">T07: Kellner</div>
                            <div className="timestamp-feed">
                                8: 56
                            </div>
                        </div>
                    </div>
                    <div className="nav-bar-item first-nav-bar-item">
                        Settings
                    </div>
                    <div className="nav-bar-item">
                        Reservation
                    </div>
                    <div className="nav-bar-item" onClick={this.props.changeToHistory}>
                        History
                    </div>
                    <div className="nav-bar-item">
                        Help
                    </div>
                </div>
            )
        }
               
    }
}

export default SideBar;


import React, { Component } from 'react';
import './assets/css/navigationBar.css';
// import OrderTable from './orderTable';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div className="container-nav-bar">
                <div className="header2">
                    <div className="header-title">
                        Navigation
                    </div>
                    <i className="ion-navicon-round hamburger-icon" onClick={this.props.showOrderTable}></i>
                </div>
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
                    Main Menu
                </div>
                <div className="nav-bar-item">
                    Reservation
                </div>
                <div className="nav-bar-item">
                    History
                </div>
                <div className="nav-bar-item">
                    Help
                </div>
            </div>
        )
    }
}

export default NavigationBar;
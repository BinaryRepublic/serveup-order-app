import React, { Component } from 'react';
import '../assets/css/navigationBar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        if(this.props.showSideBar) {
            this.props.switchToOrderTable()
        } else {
            this.props.switchToSideBar()
        }
    }
    render () {
        var showNavigationHeading;
        if(this.props.showSideBar){
            showNavigationHeading = <div className="header-sidebar-title">Navigation</div>
        }
        return (
            <nav>
                <div className="header">
                    <div className="header-title-main">
                        Order Queue
                    </div>
                    {showNavigationHeading}
                    <i className="ion-navicon-round hamburger-icon" onClick={this.onClick}></i>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;



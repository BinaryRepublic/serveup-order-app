import React, { Component } from 'react';
import './assets/css/navigationBar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
                                                
        }
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

        var showSideBarHeading;
        if(this.props.showSideBar){
            showSideBarHeading = <div className="header-title-nav">Navigation</div>
        }

        return (
            <nav>
                <div className="header">
                    <div className="header-title-main">
                        Order Queue
                    </div>
                    {showSideBarHeading}
                    <i className="ion-navicon-round hamburger-icon" onClick={this.onClick}></i>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;



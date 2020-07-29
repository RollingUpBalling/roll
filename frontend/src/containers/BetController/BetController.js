import React, { Component } from 'react';

import classes from './BetController.module.css';

class BetControl extends Component {
    render() {
        return (
                <div className={classes.BetController}>
                    <div className={classes.BetControllerHeader}>
                        <h1>CREATE BET</h1>
                        <div>
                            EDIT
                            <i className="fa fa-list-ul" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
        );
    }
};

export default BetControl;
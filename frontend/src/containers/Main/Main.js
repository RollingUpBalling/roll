import React, { Component } from 'react';

import classes from './Main.module.css';

class Main extends Component {
    render() {
        return (
                <div className={classes.Main}>
                    <div className={classes.LeftSide}></div>
                    <div className={classes.RightSide}></div>
                </div>

        );
    }
};

export default Main;


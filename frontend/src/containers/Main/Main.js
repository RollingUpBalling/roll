import React, { Component } from 'react';

import Bomb from '../Bomb/Bomb';
import RightSide from './RightSide/RightSide';

import classes from './Main.module.css';

class Main extends Component {
    render() {
        return (
                <div className={classes.Main}>
                    <div className={classes.LeftSide}>
                       <Bomb />
                    </div>
                    <div className={classes.RightSide}>
                        <RightSide />
                    </div>
                </div>

        );
    }
};

export default Main;


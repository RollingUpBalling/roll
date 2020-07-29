import React, { Component } from 'react';

import bombIMG from '../../assets/images/bomb.png';
import classes from './Bomb.module.css';

class Bomb extends Component {

    state = {
        numbers : {
            first : '0',
            second : '0',
            third : '0',
            fourth : '0'
        },
        afterNumbers : "sec"
    }

    render() {
        return (
            <>
            <img 
                className={classes.Bomb} 
                src={bombIMG} 
                alt="Bomb"/>
            <div className={classes.Board}>
                <div class={classes.Koef}>
                    <span>0</span>
                    <span>0</span>
                          .
                    <span>0</span>
                    <span>0</span>
                    <span className={classes.AfterKoef}>sec</span>
                </div>
            </div>
            </>
        );
    }
};

export default Bomb;
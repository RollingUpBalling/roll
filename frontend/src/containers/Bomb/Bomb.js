import React, { Component } from 'react';

import bombIMG from '../../assets/images/bomb.png';
import classes from './Bomb.module.css';




class Bomb extends Component {

    state = {
        startTime : null,
        first : 3,
        second : 0,
        third : 0,
        fourth : 0,
        interval: null,
    }

    updateTimer = () => {
        this.setState((prevState, prevProps)=>{
            if (this.state.fourth > 0) {
                    return {fourth: prevState.fourth - 1}
                }   else if (this.state.third > 0) {
                        return {
                            fourth: 9,
                            third : prevState.third - 1
                        }
                }   else if (this.state.second > 0) {
                    return {
                        fourth: 9,
                        third : 9,
                        second : prevState.second -1
                    }
                }  else if (this.state.first > 0) {
                    return {
                        fourth: 9,
                        third : 9,
                        second : 9,
                        first: prevState.first - 1
                    }
            }
            if (this.state.first === 0 && this.state.second === 0 && this.state.third ===0 && this.state.fourth === 0 ) {
                clearInterval(this.state.interval);
            }
        })
    };

    render() {

        if (!this.props.bets && !this.state.startTime) {
            this.setState({startTime: new Date()});
            this.state.interval = setInterval(() => {
                this.updateTimer();
            }, 40);
        }

        return (
            <>
                <img
                    className={classes.Bomb}
                    src={bombIMG}
                    alt="Bomb" />
                <div className={classes.Board}>
                    <div class={classes.Koef}>
                        <span>{this.state.first}</span>
                        <span>{this.state.second}</span>
                              .
                        <span>{this.state.third}</span>
                        <span>{this.state.fourth}</span>
                        <span className={classes.AfterKoef}>sec</span>
                    </div>
                </div>
            </>
        );
    }

};

export default Bomb;
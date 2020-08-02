import React, { Component } from 'react';
import io from 'socket.io-client';
import bombIMG from '../../assets/images/bomb.png';
import classes from './Bomb.module.css';

const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT)

class Bomb extends Component {

    state = {
        startTime: null,
        first: 3,
        second: 0,
        third: 0,
        fourth: 0,
        interval: null
    }

    componentDidMount() {
        socket.on('timer', (data) => {
            console.log(data);
            this.setState((state) => {
                return {
                    first: Math.floor(data.numbers / 10000),
                    second: Math.floor(data.numbers / 1000 % 10),
                    third: Math.floor(data.numbers / 100 % 10),
                    fourth:Math.floor(data.numbers / 10 % 10)
                }
            
            } );
    })
}

// updateTimer = () => {
//     this.setState((prevState, prevProps) => {
//         if (this.state.fourth > 0) {
//             return { fourth: prevState.fourth - 1 }
//         } else if (this.state.third > 0) {
//             return {
//                 fourth: 9,
//                 third: prevState.third - 1
//             }
//         } else if (this.state.second > 0) {
//             return {
//                 fourth: 9,
//                 third: 9,
//                 second: prevState.second - 1
//             }
//         } else if (this.state.first > 0) {
//             return {
//                 fourth: 9,
//                 third: 9,
//                 second: 9,
//                 first: prevState.first - 1
//             }
//         }
//         if (this.state.first === 0 && this.state.second === 0 && this.state.third === 0 && this.state.fourth === 0) {
//             clearInterval(this.interval);
//         }
//     })
// };

render() {

    // if (this.props.bets && !this.state.startTime) {
    //     this.setState({ startTime: new Date() });
    //     this.interval = setInterval(() => {
    //         this.updateTimer();
    //         this.setTimer();
    //     }, 20);
    // }

    return (
        <>
            <img
                className={classes.Bomb}
                src={bombIMG}
                alt="Bomb" />
            <div className={classes.BombStripe} />
            <div className={classes.Board}>
                <div className={classes.Koef}>
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
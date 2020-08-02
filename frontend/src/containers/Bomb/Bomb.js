import React, { Component } from 'react';
import io from 'socket.io-client';
import bombIMG from '../../assets/images/bomb.png';
import classes from './Bomb.module.css';

const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT)

class Bomb extends Component {

    state = {
        first: 3,
        second: 0,
        third: 0,
        fourth: 0,
    }

    componentDidMount() {

        socket.on('newPhase', (data) => {
            if (data.state === 'finished') {
                this.setState((state) => {
                    return {

                        first: 3,
                        second: 0,
                        third: 0,
                        fourth: 0
                    }
                })
            }
        });

        socket.on('timerStart', (data) => {
            this.setState((state) => {
                return {
                    first: Math.floor(data.numbers / 10000),
                    second: Math.floor(data.numbers / 1000 % 10),
                    third: Math.floor(data.numbers / 100 % 10),
                    fourth: Math.floor(data.numbers / 10 % 10)
                }

            });


        });
        socket.on('timerFinish', (data) => {
            this.setState((state) => {
                return {
                    first: Math.floor(data.koef / 10000),
                    second: Math.floor(data.koef / 1000 % 10),
                    third: Math.floor(data.koef / 100 % 10),
                    fourth: Math.floor(data.koef / 10 % 10)
                }

            });
        });







    }



    render() {


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
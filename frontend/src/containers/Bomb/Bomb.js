import React, { useState, } from 'react';

import bombIMG from '../../assets/images/bomb.png';
import classes from './Bomb.module.css';




const Bomb = (props) => {
    const [time, setTimeLeft] = useState({});
    const [startTime, setStartTime] = useState();
    const [numbers, setNumbers] = useState({});




    const startTimer = () => {


        setTimeLeft(calculateTimeLeft(startTime));
        console.log(calculateTimeLeft(startTime));
        setNumbers({
            first: time.seconds / 10,
            second: time.seconds % 10,
            third: time.miliSeconds / 10,
            fours: time.miliSeconds % 10
        });

    };


    const calculateTimeLeft = (startDate) => {

        console.log(startDate);
        let difference = new Date() - startDate;
        console.log(difference);
        let timeLeft = {};

        if (30000 > difference) {
            timeLeft = {
                seconds: Math.floor((difference / 1000) % 60),
                miliSeconds: Math.floor(Math.floor(difference % 1000) / 10 - Math.floor(difference % 1000) % 10)
            };
        }

        return timeLeft;

    }
    if (!props.bets && !startTime) {

        setInterval(() => {
            startTimer();
        }, 100);
        setStartTime(new Date());

    }

    /* useEffect(()=>{

    },[props]) */
    return (
        <>
            <img
                className={classes.Bomb}
                src={bombIMG}
                alt="Bomb" />
            <div className={classes.Board}>
                <div class={classes.Koef}>
                    <span>{numbers.first}</span>
                    <span>{numbers.second}</span>
                          .
                    <span>{numbers.third}</span>
                    <span>{numbers.fours}</span>
                    <span className={classes.AfterKoef}>sec</span>
                </div>
            </div>
        </>
    );

};

export default Bomb;
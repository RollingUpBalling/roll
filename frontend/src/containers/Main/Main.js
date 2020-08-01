import React, { useState, useEffect } from 'react';

import Bomb from '../Bomb/Bomb';
import BettingsPlace from '../BettingsPlace/BettingsPlace';
import GameStat from '../../components/UI/GameStat/GameStat';
import BetCard from '../../components/UI/Bet/BetCard/BetCard';
import classes from './Main.module.css';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

const Main = () => {
    
    const [bets, addBet] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const socket = io(ENDPOINT)
        socket.on('addBet', data=>{
            console.log(data.bet)
            addBet(bets => [...bets,data.bet]);
        })
    }, [])

        return (
                <div className={classes.Main}>
                    {console.log(bets)}
                    <div className={classes.LeftSide}>
                       <Bomb />
                    </div>
                    <div className={classes.RightSide}>
                        <BettingsPlace />
                        <GameStat />
                        <div className={classes.BetCards}>
                            <BetCard />
                            <BetCard />
                            <BetCard />
                            <BetCard />
                            <BetCard />
                            <BetCard />
                        </div>
                    </div>
                </div>

        );
    
};

export default Main;


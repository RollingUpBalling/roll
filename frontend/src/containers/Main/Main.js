import React, { useState, useEffect } from 'react';

import Bomb from '../Bomb/Bomb';
import BettingsPlace from '../BettingsPlace/BettingsPlace';
import GameStat from '../../components/GameStat/GameStat';
import BetCard from '../../components/UI/Bet/BetCard/BetCard';
import LastCrashes from '../../components/LastCrashes/LastCrashes';
import BetSum from '../../components/BetSum/BetSum';

import classes from './Main.module.css';
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

const Main = () => {
    
    const [bets, addBet] = useState([]);
    const [betsNum, addBetNum] = useState(0);
    const [bank, addToBank] = useState(0);



    useEffect(() => {
        const socket = io(ENDPOINT)
        socket.on('addBet', data=>{
            console.log(data.bet)
            addBet(bets => [...bets,data.bet]);
            addToBank(bank => bank + data.bet.amount);
            addBetNum(betsNum => betsNum + 1);
        })
        socket.on('getBets',data=>{
            console.log(data.bet)
            addBet(bets => [...bets,...data.bets]);
            addToBank(data.gameAmount);
            addBetNum(data.users);
        })
        socket.on('newPhase',data => {
            if (data.state === 'finished') {
                addBetNum(0)
                addToBank(0)
                addBet([])
            }
        })
    }, [])

        return (
                <div className={classes.Main}>
                    {console.log(bets)}
                    <div className={classes.LeftSide}>
                       <Bomb bets={betsNum} />
                       <LastCrashes />
                       <BetSum />
                    </div>
                    <div className={classes.RightSide}>
                        <BettingsPlace />
                        <GameStat bank={bank} betCount={betsNum} />
                        <div className={classes.BetCards}>
                            {bets.map((betInfo,index) => (
                                <>
                                <BetCard 
                                betInfo={betInfo} 
                                key={index}
                                status='Success' />
                                </>
                            ))
                            }
                        </div>
                    </div>
                </div>

        );
    
};

export default Main;


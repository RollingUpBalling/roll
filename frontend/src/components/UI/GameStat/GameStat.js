import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import classes from './GameStat.module.css';

const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT)

const GameStat = (props) => {
    const [players, addPlayer] = useState(0);
    const [bank, addToBank] = useState(0);

    useEffect(() => {

        socket.on('addBet', res => {
            addToBank(res.gameAmount);
            addPlayer(res.users);
        });

    }, []);



    return (
        <div className={classes.GameStat}>
            <div className={classes.GameStatHeader}>
                <span>
                    <i className="fa fa-pie-chart" aria-hidden="true"></i>
                ROUND STATS
            </span>
            </div>

            <div className={classes.GameStatsInfo}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <div className={classes.PlayersCount}>
                    <p className={classes.Number}>{players}</p>
                    <p className={classes.Label}>players</p>
                </div>
            </div>

            <div
                className={classes.GameStatsInfo}
                style={{ paddingLeft: '30px' }}>
                <i className="fa fa-money" aria-hidden="true"></i>
                <div className={classes.PlayersCount}>
                    <p className={classes.Number}>{bank}</p>
                    <p className={classes.Label}>total bank</p>
                </div>
            </div>

            <div className={classes.GameStatsInfo}
                style={{ paddingLeft: '40px' }}>
                <i className="fa fa-heart" aria-hidden="true"></i>
                <div className={classes.PlayersCount}>
                    <p className={classes.Number}>100</p>
                    <p className={classes.Label}>skins</p>
                </div>
            </div>
        </div>
    );
};

export default GameStat;
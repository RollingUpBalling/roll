import React from 'react'
import classes from './GameStat.module.css';

const GameStat = (props) => {




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
                    <p className={classes.Number}>{props.betCount}</p>
                    <p className={classes.Label}>bets</p>
                </div>
            </div>

            <div
                className={classes.GameStatsInfo}
                style={{ paddingLeft: '30px' }}>
                <i className="fa fa-money" aria-hidden="true"></i>
                <div className={classes.PlayersCount}>
                    <p className={classes.Number}>{props.bank}</p>
                    <p className={classes.Label}>total bank</p>
                </div>
            </div>

            <div className={classes.GameStatsInfo}
                style={{ paddingLeft: '40px' }}>
                <i className="fa fa-heart" aria-hidden="true"></i>
                <div className={classes.PlayersCount}>
                    <p className={classes.Number}>{props.betCount}</p>
                    <p className={classes.Label}>skins</p>
                </div>
            </div>
        </div>
    );
};

export default GameStat;
import React, { Component } from 'react';

import Bomb from '../Bomb/Bomb';
import BettingsPlace from '../BettingsPlace/BettingsPlace';
import GameStat from '../../components/UI/GameStat/GameStat';
import BetCard from '../../components/UI/Bet/BetCard/BetCard';

import classes from './Main.module.css';

class Main extends Component {
    render() {
        return (
                <div className={classes.Main}>
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
    }
};

export default Main;


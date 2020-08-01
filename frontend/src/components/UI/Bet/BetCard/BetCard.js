import React from 'react';
import testSteamAvatar from '../../../../assets/images/test_steam_avtr.jpg';
import classes from './BetCard.module.css';


const BetCard = ( props ) => {

    return (
        <div className={classes.BetCard}>
            <img 
                alt='Steam avatar'
                src={testSteamAvatar}/>
            <div className={classes.BetCount}>
                <span>$100</span>
            </div>
            <div className={classes.GameStatusHeader}>
                <div className={classes.GameStatus}>
                    <span>in game</span>
                </div>
            </div>

        </div>
    );
};

export default BetCard
import React from 'react';

import BetController from '../BetController/BetController';

import classes from './BettingsPlace.module.css';

const bettingsPlace = props =>  {
        return (
            <div style={{display: 'flex'}}>
                <div className={classes.SkinBlock}>
                    <div className={classes.loader} />
                    <span>Waiting for bet...</span>
                </div>
                <BetController />
            </div>
        );
};

export default bettingsPlace;
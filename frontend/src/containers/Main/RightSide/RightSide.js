import React from 'react';

import BetController from '../../BetController/BetController';

import classes from './RightSide.module.css';

const rightSide = () =>  {
        return (
            <>
                <div className={classes.SkinBlock}>
                    <div className={classes.loader} />
                    <span>Waiting for bet...</span>
                </div>
                <BetController />
            </>
        );
};

export default rightSide;
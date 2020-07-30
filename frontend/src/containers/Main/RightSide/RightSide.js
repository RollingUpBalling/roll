import React from 'react';

import classes from './RightSide.module.css';
import MakeBetButton from '../../../components/UI/Bet/Bet';

const rightSide = ( props ) => {
    return (
        <React.Fragment>
            <div className={classes.SkinBlock}>
                <div className={classes.loader} />
                <span>Waiting for bet...</span>
                <MakeBetButton/>
            </div>
        </React.Fragment>
    );
};

export default rightSide;
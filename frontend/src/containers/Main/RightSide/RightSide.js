import React from 'react';

import classes from './RightSide.module.css';

const rightSide = ( props ) => {
    return (
        <React.Fragment>
            <div className={classes.SkinBlock}>
                <div className={classes.loader} />
                <span>Waiting for bet...</span>
            </div>
        </React.Fragment>
    );
};

export default rightSide;
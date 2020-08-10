import React from 'react';

import classes from './LastCrash.module.css';

const lastCrash = ( props ) => {
    return (
        <div className={classes.LastCrash}>
            {props.koef}
        </div>
    );
};

export default lastCrash;
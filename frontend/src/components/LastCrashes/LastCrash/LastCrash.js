import React from 'react';

import classes from './LastCrash.module.css';

const lastCrash = (props) => {
    const defaultClasses = [classes.LastCrash];
    const koef = props.koef;
    if (koef < 1.3)
        defaultClasses.push(classes.LastCrash_very_low);
    if (koef >= 1.3)
        defaultClasses.push(classes.LastCrash_low);
    if (koef >= 1.7)
        defaultClasses.push(classes.LastCrash_pre_medium);
    if (koef >= 2.5)
        defaultClasses.push(classes.LastCrash_medium);
    if (koef >= 3.5)
        defaultClasses.push(classes.LastCrash_high);


    return (
        <div className={defaultClasses.join(' ')}> {koef.toFixed(2)+'x'} </div >
    );
};

export default lastCrash;
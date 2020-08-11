import React from 'react';

import classes from './LastCrash.module.css';

const lastCrash = (props) => {
    const koef = props.koef;
    let block;
    if (koef < 1.3)
        block = classes.LastCrash_very_low
    if (koef >= 1.3)
        block = classes.LastCrash_low
    if (koef >= 1.7)
        block = classes.LastCrash_pre_medium
    if (koef >= 2.3)
        block = classes.LastCrash_medium
    if (koef >= 3)
        block = classes.LastCrash_high


    return (
        <div className={block}> {koef.toFixed(2)} </div >
    );
};

export default lastCrash;
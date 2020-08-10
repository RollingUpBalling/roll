import React from 'react';

import classes from './LastCrashes.module.css';
import LastCrash from './LastCrash/LastCrash';

const lastCrashes = (props) => (
    <div className={classes.LastCrashes}>
        {props.koefs.map(koef => (
            <LastCrash koef={koef.koef} />
        ))
        
    }
    </div>
);

export default lastCrashes;
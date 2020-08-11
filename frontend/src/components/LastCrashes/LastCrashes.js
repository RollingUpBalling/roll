import React from 'react';

import classes from './LastCrashes.module.css';
import LastCrash from './LastCrash/LastCrash';

const lastCrashes = (props) => (
    <div className={classes.LastCrashes}>
        {props.koefs.map((koef, index) => (
            <LastCrash 
                key={index} 
                koef={koef.koef} />
        ))
        
    }
    </div>
);

export default lastCrashes;
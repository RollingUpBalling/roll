import React from 'react';

import classes from './Switcher.module.css';

const switcher = (props) => (
    <div className={classes.Switcher}>
        <input type="checkbox"  onClick={props.clicked}/>
        <span>{props.label}</span>
    </div>
);

export default switcher;
import React from 'react';

import classes from './SignInButton.module.css';

const signInButton = (props) => (
    <div className={classes.SignInButton}>
        <a href="/"> 
        Sign with Steam 
        <i className="fa fa-steam" aria-hidden="true"></i>
        </a>
    </div>
);

export default signInButton;
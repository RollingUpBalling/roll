import React from 'react';

import classes from './SignInButton.module.css';

const signInButton = (props) => (
    <a href="/" >
        <div className={classes.SignInButton}>
            <span>
                Sign with Steam 
                <i className="fa fa-steam" aria-hidden="true"></i>
            </span>
        </div>
    </a>
);

export default signInButton;
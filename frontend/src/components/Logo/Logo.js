import React from 'react';

import csLogo from '../../assets/images/logo.png';

import classes from './Logo.module.css';

const logo = ( props ) => (
        <img src={csLogo} alt='CSFail' className={classes.Logo}/>
);

export default logo;
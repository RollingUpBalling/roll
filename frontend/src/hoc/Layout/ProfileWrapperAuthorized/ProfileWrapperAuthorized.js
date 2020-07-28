import React from 'react';

import classes from './Profile.module.css';

import Aux from '../../../hoc/Auxillary/Auxillary';
import SettingsButton from '../../../components/UI/SettingsButton/SettingsButton';

const profileWrapperAuthorized = ( props ) => {
    return (
        <Aux>
            <div className={classes.DepositButton}>
                <span>
                    Deposit
                    <i className="fa fa-money" aria-hidden="true"></i>
                </span>
            </div>
            <div style={{marginLeft: "15px"}}>
                <p className={classes.Name}>
                    <a href="/">{localStorage.getItem("username")}</a>
                </p>
                <p className={classes.Balance}>
                    {'$' + localStorage.getItem("balance")}
                </p>
            </div>
            <SettingsButton />
            <div 
            className={classes.LogOut}
            onClick={props.clicked}>
                <i className="fa fa-sign-out" aria-hidden="true" ></i>
            </div>
        </Aux>
    );
};

export default profileWrapperAuthorized;
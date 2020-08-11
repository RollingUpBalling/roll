import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Auxillary/Auxillary';
import SettingsButton from '../../../components/UI/SettingsButton/SettingsButton';
import Deposit from './Deposit'
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './Profile.module.css';


const ENDPOINT = "http://127.0.0.1:5000";

const ProfileWrapperAuthorized = ( props ) => {

    return (
        <Aux>
            <div
             
             className={classes.DepositButton}>
                 <Deposit />
                
            </div>
            <div style={{ marginLeft: "15px" }}>
                <p className={classes.Name}>
                    <a href="/">{JSON.parse(localStorage.getItem('userData')).username}</a>
                </p>
                <p className={classes.Balance}>
                    { props.balance !== null ? '$'+ props.balance : <Spinner />}
                </p>    
            </div>
            <div className={classes.Avatar} style={{ marginLeft: "15px" }}>
                <img alt='Steam avatar' src={props.avatar}/>
            </div>
            <SettingsButton
                showSettings={props.showSettings}
                settingsHandler={props.settingsHandler}
                closeSettings={props.closeSettings}
                changeAnimation={props.changeAnimation}
                animation={props.animation} />
            <div
                className={classes.LogOut}
                onClick={props.clicked}>
                <i className="fa fa-sign-out" aria-hidden="true" ></i>
            </div>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
      balance: state.bln.balance,
      avatar: state.ava.avatar
    };
};

export default connect(mapStateToProps)(ProfileWrapperAuthorized);
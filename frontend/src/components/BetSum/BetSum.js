import React, { useState, useContext } from 'react';
import { connect } from 'react-redux'

import * as actionTypes from '../../store/actions';

import SignInButton from '../../components/UI/SignInButton/SignInButton';
import { AuthContext } from '../../context/auth-context';

import classes from './BetSum.module.css';

const BetSum = (props) => {
    const auth = useContext(AuthContext);
    const [amount, setAmount] = useState(null);

    const maxAmountSetHandler = () => {
        setAmount(1000);
    }

    return (
        <div className={classes.BetSumBody}>
            {
                auth.isLoggedIn ? (
                    <>
                        <div className={classes.Balance}> 
                            <span>
                                Balance: 
                                <span className={classes.BalanceValue}>
                                    {props.balance}
                                </span>
                            </span>
                        </div>
                        <input
                            className={classes.KoefInput}
                            placeholder="YOUR BET..."
                            value={props.value !== null ? props.value : ''}
                            type='number'
                            min='0'
                            max='1000'
                            onChange={(event) => props.updateBetValue(event)}
                        />
                        <button className={classes.Clear} onClick={props.clearAmountHandler}>
                            clear
                        </button>
                        <button className={classes.Max} onClick={() => props.maxAmountSetHandler(props.balance)}>
                            max
                        </button>
                    </>
                ) :
                    (
                        <>
                            <i className="fa fa-lock" style={{
                                display: 'block',
                                width: '52px',
                                fontSize: '80px',
                                color: '#434d78',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                                }} aria-hidden="true"></i>
                            <h1 className={classes.LabelLogin}>
                                You need to login with steam to make bet
                            </h1>
                            <div className={classes.SignInButton}>
                            <SignInButton />
                            </div>
                        </>
                    )
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        value: state.bv.betValue,
        balance: state.bln.balance
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBetValue: (event) => dispatch({type: actionTypes.UPDATE_BET_VALUE, event: event}),
        clearAmountHandler: () => dispatch({type: actionTypes.CLEAR_BET_VALUE}),
        maxAmountSetHandler: (maxValue) => dispatch({type: actionTypes.ADD_MAX_BET_VALUE, value: maxValue})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSum);
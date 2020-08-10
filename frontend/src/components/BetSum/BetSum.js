import React, { useState, useContext } from 'react';

import SignInButton from '../../components/UI/SignInButton/SignInButton';
import { AuthContext } from '../../context/auth-context';
import classes from './BetSum.module.css';

const BetSum = (props) => {
    const auth = useContext(AuthContext);
    const [amount, setAmount] = useState(null);

    const koefChangedHandler = (event) => {
        setAmount(event.target.value);
    };

    const clearAmountHandler = () => {
        setAmount(0);
    };

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
                                Balance: <span className={classes.BalanceValue}>1000$</span>
                            </span>
                        </div>
                        <input
                            className={classes.KoefInput}
                            placeholder="YOUR BET..."
                            value={amount !== null ? amount : ''}
                            type='number'
                            min='0'
                            max='1000'
                            onChange={koefChangedHandler}
                        />
                        <button className={classes.Clear} onClick={clearAmountHandler}>
                            clear
                        </button>
                        <button className={classes.Max} onClick={maxAmountSetHandler}>
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

export default BetSum;
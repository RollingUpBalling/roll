import React, { useState, useContext } from 'react';

import SignInButton from '../../components/UI/SignInButton/SignInButton';
import { AuthContext } from '../../context/auth-context';
import classes from './BetSum.module.css';

const BetSum = (props) => {
    const auth = useContext(AuthContext);
    const [amount, setAmount] = useState(0);

    const koefChangedHandler = (event) => {
        setAmount(event.target.value);
    };

    return (
        <div className={classes.BetSumBody}>
            {
                auth.isLoggedIn ? (
                    <>
                        <header>
                            Amount of bet
                        </header>
                        <input
                            value={amount}
                            type='number'
                            min='0'
                            max='1000'
                            onChange={koefChangedHandler}
                        />
                    </>
                ) :
                    (
                        <>
                            <h1>You need to login with steam</h1>

                            <SignInButton />
                        </>
                    )
            }
        </div>
    );
};

export default BetSum;
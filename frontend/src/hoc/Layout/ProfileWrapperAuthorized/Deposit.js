import React, { useState } from 'react';
import axios from 'axios';
import DepositModal from '../../../components/UI/DepositModal/DepositModal';
import classes from './Deposit.module.css';



const ENDPOINT = "http://127.0.0.1:5000";

const Deposit = (props) => {
    const [amount, setAmount] = useState(0);
    const [showInput, setShowInput] = useState(false);

    const makeDeposit = () => {
        setShowInput(true);
    };

    const goBack = () =>{
        setShowInput(false);
    }

    const koefChangedHandler = (event) => {
        setAmount(event.target.value);
    };


    const createDepo = async () => {
        try {
            const res = await axios.post(ENDPOINT + '/deposit', { amount: amount }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                }
            });
            window.location = `https://www.liqpay.ua/api/3/checkout?data=${res.data.data}&signature=${res.data.signature}`;
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <DepositModal
                show={showInput}
                onCancel = {goBack}
            >
                <input
                    id="amount"

                    value={amount}
                    onChange={koefChangedHandler}
                    type='number'
                    min='0'
                    max='1000'
                    className={classes.KoefInput}
                    onSubmit={createDepo}
                >
                </input>
                <button 
                    disabled={amount <= 0}
                    type="submit"
                    onClick={createDepo}
                    className={classes.PayButton}
                >
                    Pay
                </button>
            </DepositModal>
            <div onClick={makeDeposit}>
                <span>
                    Deposit
                    <i className="fa fa-money" aria-hidden="true"></i>
                </span>
            </div>
        </>

    );
}
export default Deposit;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../../components/UI/ErrorModal/Mod';
//import classes from './Deposit.css';
import classes from './Profile.module.css';


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
            <Modal
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
                    type="submit"
                    onClick={createDepo}
                >
                    Pay
                </button>
            </Modal>
            <span onClick={makeDeposit}>
                Deposit
            <i className="fa fa-money" aria-hidden="true"></i>
            </span>
        </>

    );
}
export default Deposit;
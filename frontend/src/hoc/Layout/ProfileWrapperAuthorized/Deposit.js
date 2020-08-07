import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import classes from './Deposit.css';


const ENDPOINT = "http://127.0.0.1:5000";

const Deposit = (props) => {
    console.log(props)
    const [amount, setAmount] = useState(0);
    const [pressed, setPressed] = useState(false);
    const [data, setData] = useState();
    const [sign, setSign] = useState();


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
            setData(res.data.data);
            setSign(res.data.signature)
            setPressed(true);
        }
        catch (err) {
            console.log(err.response);
        }

    }

    return (

        <div>
            <input
                id="amount"

                value={amount}
                onChange={koefChangedHandler}
                type='number'
                min='0'
                max='1000'
                className={classes.KoefInput}
            >
            </input>
            <button type="submit" onClick={createDepo}>
                
                asd

            </button>
                <a href={`https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${sign}`} >
                    Pay
                </a>
        </div>

    );
}
export default Deposit;
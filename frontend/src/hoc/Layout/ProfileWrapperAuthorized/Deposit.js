import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import classes from './Deposit.css';


const ENDPOINT = "http://127.0.0.1:5000";

const Deposit = (props) => {
    const [amount, setAmount] = useState(0);



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

        <div>
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
            <button type="submit" onClick={createDepo}>
                Pay
            </button>
               {/*  <a href={``} >
                    Pay
                </a> */}
        </div>

    );
}
export default Deposit;
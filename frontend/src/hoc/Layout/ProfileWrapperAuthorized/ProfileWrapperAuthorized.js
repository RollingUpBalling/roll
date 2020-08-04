import React,{useState, useEffect} from 'react';

import classes from './Profile.module.css';
import axios from 'axios'
import Aux from '../../../hoc/Auxillary/Auxillary';
import SettingsButton from '../../../components/UI/SettingsButton/SettingsButton';
import socket from '../../../socket'

const ENDPOINT = "http://127.0.0.1:5000";

const ProfileWrapperAuthorized = ( props ) => {

    const [balance,updateBalance] = useState(1)
    
    useEffect(() => {
        try {
            const getBalance = async () => {
                const response = await axios.get(ENDPOINT+'/getUser/' + JSON.parse(localStorage.getItem('userData')).userId + '/')
                updateBalance(response.data.balance)    
            }
            getBalance()
            // const socket = io(ENDPOINT)
            // socket.on('newPhase',async data => {
            //     if (data.state === 'finished') {
            //         const response = await axios.get(ENDPOINT+'/getUser/' + JSON.parse(localStorage.getItem('userData')).userId + '/')
            //         updateBalance(response.data.balance)
            //     }
            //     if(data.state === 'active') {
            //         console.log('state changed')
            //         socket.emit('subToUpdateBalance',{})
            //     }
            // })
            console.log(socket.id)
           // socket.emit('subToUpdateBalance',{})
            socket.on('updateBalance',data => {
                console.log('WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRRRRRRRRKKKKKKKKKKKKKKKKKKKKKKKKKK')
                updateBalance(data.newBalance)
            })
        } catch (error) { }

        
        
    },[])

    return (
        <Aux>
            {console.log(socket.id)}
            <div className={classes.DepositButton}>
                <span>
                    Deposit
                    <i className="fa fa-money" aria-hidden="true"></i>
                </span>
            </div>
            <div style={{marginLeft: "15px"}}>
                <p className={classes.Name}>
                    <a href="/">{JSON.parse(localStorage.getItem('userData')).username}</a>
                </p>
                <p className={classes.Balance}>
                    {'$'+balance}
                </p>    
            </div>
            <SettingsButton 
            showSettings={props.showSettings}
            settingsHandler={props.settingsHandler}
            closeSettings={props.closeSettings}
            changeAnimation={props.changeAnimation}
            animation={props.animation}/>
            <div 
            className={classes.LogOut}
            onClick={props.clicked}>
                <i className="fa fa-sign-out" aria-hidden="true" ></i>
            </div>
        </Aux>
    );
};

export default ProfileWrapperAuthorized;
import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import axios from 'axios'
import classes from './Bet.module.css';

const ENDPOINT = "http://127.0.0.1:5000";

const MakeBetButton = props => {

    const [socket, connect] = useState()
    const [gameId,updateId] = useState()
    
    useEffect(() => {
        const socket = io(ENDPOINT)
        socket.on('recieveId',id => {
            console.log(id)
            updateId(id)
        })
    }, [])

    const createGame = async () => {
        try {
            const game = await axios.post(ENDPOINT + '/createGame/',{},{
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                }
            })
            console.log(game)
        }
        catch (error) {
            console.log(error.response);
        }
       
    }

    // const makeNewBet = () => {
    //     console.log(socket.connected)
    //     socket.emit('makeBet', {
            
    //     })
    // }

    return (
        <div>
            <button 
            onClick={createGame}
            className={classes.Bet}>START $0</button>
            {/*Game is in progress 
            should add some logic to making button disabled or not*/}
        </div>
    )
}

export default MakeBetButton
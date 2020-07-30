import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import axios from 'axios'
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
            console.log(error)
        }
       
    }

    // const makeNewBet = () => {
    //     console.log(socket.connected)
    //     socket.emit('makeBet', {
            
    //     })
    // }

    return (
        <div>
            <button onClick={createGame}>makeBet</button>
        </div>
    )
}

export default MakeBetButton
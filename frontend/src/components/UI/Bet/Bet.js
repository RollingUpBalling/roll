import React, {useEffect, useState} from 'react'
import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const MakeBetButton = props => {
    
    const [socket,connect] = useState() 

    useEffect(() => {
        connect(io(ENDPOINT))
     //  socket.on('makeBet',res => console.log(res)) 
    },[])

    const makeNewBet = () => {
        console.log(socket.connected)
        socket.emit('makeBet',{
            //data to make bet
            // jwt token ????
            username:'kiki'
        })
    }
           
    return (
        <div>
            <button onClick={makeNewBet}>makeBet</button>
        </div>
    )
}

export default MakeBetButton
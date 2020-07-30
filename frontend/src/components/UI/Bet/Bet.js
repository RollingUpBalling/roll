import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import axios from 'axios'
import ErrorModal from '../ErrorModal/ErrorModal';

const ENDPOINT = "http://127.0.0.1:5000";

const MakeBetButton = props => {

    const [socket, connect] = useState()
    const [gameId, updateId] = useState()
    const [error, setError] = useState();

    useEffect(() => {
        const socket = io(ENDPOINT)
        socket.on('recieveId', id => {
            console.log(id)
            updateId(id)
        })
    }, [])


    const handleError = () => {
        setError(null);
    };

    const createGame = async () => {
        try {
            const game = await axios.post(ENDPOINT + '/createGame/', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                }
            })
            console.log(game)
        }
        catch (err) {
            console.log(err.response)
            setError(err.response.data.message);

        }

    }

    // const makeNewBet = () => {
    //     console.log(socket.connected)
    //     socket.emit('makeBet', {

    //     })
    // }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}

            <div>
                <button onClick={createGame}>makeBet</button>
            </div>
        </React.Fragment>
    )
}

export default MakeBetButton
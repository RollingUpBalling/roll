import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import axios from 'axios'
import ErrorModal from '../ErrorModal/ErrorModal';

const ENDPOINT = "http://127.0.0.1:5000";

const MakeBetButton = props => {

    const [socket, connect] = useState()
    const [gameId, updateId] = useState()
    const [bets, addBet] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const socket = io(ENDPOINT)
        socket.on('recieveId', id => {
            console.log(id, 'vsem q from useEffect')
            updateId(id.gameId)
        });
        socket.on('addBet', bet=>{
            console.log(bet)
            addBet(bet.bet);
        })
    }, [])


    const handleError = () => {
        setError(null);
    };

    const createGame = async () => {
        try {
            if (!localStorage.getItem('userData')) {
                return setError('Please login to continue')
            }
            const game = await axios.post(ENDPOINT + '/createGame/', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                }
            })
        }
        catch (err) {
            console.log(err.response)
            if (!err.response) {
                return setError('unexpected error happened from game')
            }
            return setError(err.response.data.message);

        }

    }

    const makeNewBet = async () => {
        try {
            if (!localStorage.getItem('userData')) {
                return setError('Please login to continue')
            }
            const bet = await axios.post(ENDPOINT + '/makeBet/', {
                gameID: gameId,
                steamUsername: "q",
                koef: 3.22,
                amount: 100
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                }
            })
            console.log(bet)
        }
        catch (err) {
            console.log(err.response)
            if (!err.response) {
                return setError('unexpected error happened from bet')
            }
            return setError(    JSON.stringify(err.response.data.message) || 'hz what happen');

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}

            <div>
                {!gameId && <button onClick={createGame} >makeBet</button>}
                { gameId && <button onClick={makeNewBet} >makeBet</button>}
                
            </div>
            {console.log(gameId)}
        </React.Fragment>
    )
}

export default MakeBetButton
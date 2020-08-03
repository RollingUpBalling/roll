import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import axios from 'axios'
import classes from './Bet.module.css';

import ErrorModal from '../ErrorModal/ErrorModal';

const ENDPOINT = "http://127.0.0.1:5000";

const MakeBetButton = props => {

    const [gameState,updateGameState] = useState('makingBets')
    const [gameId, updateId] = useState()
    const [error, setError] = useState();

    useEffect(() => {
        const socket = io(ENDPOINT)
        socket.on('recieveId', id => {
            updateId(id.gameId)
            console.log(id.gameId)
        });
        socket.on('newPhase',data => {
            console.log(data)
            updateGameState(data.state)
        })
        socket.on('message',data => {
            console.log(data)
        })
    }, [])

    useEffect(() => {
        if (gameState === 'finished') {
            updateId('')
            
        }
    },[gameState])


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
            if (game) {
                const bet = await axios.post(ENDPOINT + '/makeBet/', {
                    gameID: game.data.gameId,
                    userId: JSON.parse(localStorage.getItem('userData')).userId,
                    koef: props.koef,
                    amount: 100
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                    }
                })
                console.log(bet)
            }
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
                userId: JSON.parse(localStorage.getItem('userData')).userId,
                koef: props.koef,
                amount: 140
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
        <>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}

            <div>
                
                {!gameId && <button onClick={createGame} className={classes.Bet}>START $0</button>}
                {gameId 
                    ? gameState === 'active' ? <button onClick={makeNewBet} className={classes.Bet} disabled>GAME IS IN PROGRESS...</button> : <button onClick={makeNewBet} className={classes.Bet}>START $0</button>
                    : null
                }
            
            </div>
        </>              
    )
}

export default MakeBetButton
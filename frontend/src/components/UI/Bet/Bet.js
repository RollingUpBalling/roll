import React, { useEffect, useState } from 'react'

import axios from 'axios'
import classes from './Bet.module.css';

import ErrorModal from '../ErrorModal/ErrorModal';
import socket from '../../../socket'

const ENDPOINT = "http://127.0.0.1:5000";


const MakeBetButton = props => {

    const [gameState,updateGameState] = useState('makingBets')
    const [userBet,updateUserBet] = useState()
    const [gameId, updateId] = useState()
    const [error, setError] = useState();

    useEffect(() => {
        
        socket.on('recieveId', id => {
            updateId(id.gameId)
            console.log(id.gameId)
        });
        socket.on('newPhase',data => {
            console.log(data)
            updateGameState(data.state)
        })

    }, [])

    useEffect(() => {
       
        if (gameState === 'finished') {
            updateId('')
            updateUserBet()
        }
    },[gameState])

    // useEffect(() => {
    //     const socket = io(ENDPOINT)
    //     socket.on('timerFinish', data => {
    //         if (userBet.koef <= parseFloat(data.koef / 1000 + '.' + data.koef % 1000 / 100) ) {

    //         }
    //     });
    // })


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
                const response = await axios.post(ENDPOINT + '/makeBet/', {
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
                console.log(response)
               // socket.emit('subToUpdateBalance',{})
                if (response.data.bet.user._id === JSON.parse(localStorage.getItem('userData')).userId) {
                    
                    console.log(socket.id)
                    updateUserBet(response.data.bet)
                    socket.emit('subToUpdateBalance',{})
                }
                console.log(response)
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
            const response = await axios.post(ENDPOINT + '/makeBet/', {
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
            if (response.data.bet.user === JSON.parse(localStorage.getItem('userData')).userId) {
               
                updateUserBet(response.data.bet)
                socket.emit('subToUpdateBalance',{})
            }
        }
        catch (err) {
            console.log(err.response)
            if (!err.response) {
                return setError('unexpected error happened from bet')
            }
            return setError(    JSON.stringify(err.response.data.message) || 'hz what happen');

        }
    }

    const retrieveBet = async () => {
        try {
           console.log('triggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer')
            const response = await axios.put(ENDPOINT + '/retrieveWinningBet/',{
                id:userBet._id
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                }
            })
            console.log(response)
        }
        catch (err) {
            return setError('error')
        }
        

    }

    return (
        <>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}

            <div>
                
                {!gameId && <button onClick={createGame} className={classes.Bet}>START $0</button>}
                {gameId 
                
                    ? gameState === 'active' 
                        ? userBet
                            ? <button onClick={retrieveBet} className={classes.Bet}>Retrieve bet</button>
                            : <button onClick={makeNewBet} className={classes.Bet} disabled>GAME IS IN PROGRESS...</button> 
    
                        : gameState === 'makingBets' 
                            ? userBet 
                                ? <button className={classes.Bet}>waiting for game to start</button>
                                : <button onClick={makeNewBet} className={classes.Bet}>START $0</button>
                            : null
                    : null
 
                }
            
            </div>
        </>              
    )
}

export default MakeBetButton
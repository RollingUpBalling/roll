import * as actionTypes from '../actions';

const initialState = {
    betValue: null
};

const betValueReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BET_VALUE:
            return {
                ...state,
                betValue: action.event.target.value
            }
        case actionTypes.CLEAR_BET_VALUE:
            return {
                ...state,
                betValue: 0
            }
        case actionTypes.ADD_MAX_BET_VALUE:
            return {
                ...state,
                betValue: action.value
            }
    };
    return state;
};

export default betValueReducer;
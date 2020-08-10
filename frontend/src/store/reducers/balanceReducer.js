import * as actionTypes from '../actions';

const initialState = {
    balance: 0
};

const balanceReducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_BALANCE:
            return {
                ...state,
                balance: action.value.toFixed(2)
            }
    }
    return state;
};

export default balanceReducer;
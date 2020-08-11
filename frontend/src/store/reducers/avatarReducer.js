import * as actionTypes from '../actions';

const initialState = {
    avatar: ''
};

const avatarReducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AVATAR:
            return {
                ...state,
                avatar: action.value
            }
    }
    return state;
};

export default avatarReducer;
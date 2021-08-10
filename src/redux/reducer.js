import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
// import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'user',
    storage: storageSession,
    whitelist: ['reducer']
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const login = (id) => {
    return {
        type: LOGIN,
        userId: id,
    };
}

const logout = (/*id*/) => {
    return {
        type: LOGOUT,
        // userId: id,
    };
}

const initState = {
    isLoggedIn: false,
    userId: null,
};

const reducer = (state=initState, action) => {
    switch(action.type) {
        case LOGIN:
            return {...state, isLoggedIn: true, userId: action.userId};
        case LOGOUT:
            return {...state, isLoggedIn: false, userId: null };
        default:
            return state;
    }
};

const rootReducer = combineReducers({reducer});

export default persistReducer(persistConfig, rootReducer);
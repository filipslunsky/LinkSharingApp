import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/state/slice.js';
import linksSlice from '../features/links/state/slice.js';

const appReducer = combineReducers({
    user: userSlice,
    links: linksSlice,
});

const store = configureStore({
    reducer: appReducer
});

export default store;

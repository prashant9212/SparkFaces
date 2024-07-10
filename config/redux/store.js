// store.js
import { createStore } from 'redux';
import trackReducer from './reducer';

const store = createStore(trackReducer);

export default store;

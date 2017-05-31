/* eslint-disable */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducer from 'src/Reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  // ...options
});

// 创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
const store = createStore(
  combineReducers(reducer),
  applyMiddleware(logger, thunk)
);

export default store;

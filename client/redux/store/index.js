import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
//这个中间件使得store.dispatch方法可以接受 Promise 对象作为参数。这时，Action Creator 有两种写法。写法一，返回值是一个 Promise 对象。
import promiseMiddleware from 'redux-promise-middleware';
import reducer from '../reducers';

const store = applyMiddleware(
	thunkMiddleware,
	promiseMiddleware()
)(createStore)(reducer,{});

export default store;
/*
* 现在createStore可以有两种用法
* 1 没有中间件
* const store = createStore(reducer, initState)
* 2 有中间件
* const store = applyMiddleware(middleware1, middleware2, ...)(createStore)(reducer, initState)
* 还有一种用法
*
* const store = createStore(reducer, initState, applyMiddleware(middleware1, middleware2, ...))
* 现在的createStore方法还不支持这种用法,需要对createStore方法进行扩展
* */
import { applyMiddleware } from './redux'

const createStore = (reducer, initState, enhancer) => {
    /*
    * 有时候不想传入默认的state
    */
    if(typeof initState === 'function') {
        enhancer = initState
        initState = undefined
    }
    if(enhancer && typeof enhancer === 'function') {
        const newCreateStore = enhancer(createStore)
        return newCreateStore(reducer, initState)
    }
    let state = initState,
        listeners = []
    const getState = _ => state
    function subscribe(fn) {
        listeners.push(fn)
        return _ => {
            const index = listeners.indexOf(fn)
            listeners.splice(index, 1)
        }
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(f => f())
    }
    // dispatch一个不匹配的值,来返回初始state
    dispatch({ type: Symbol() })
    return {
        getState,
        dispatch,
        subscribe
    }
}

const initState = {
    count: 0
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.num
            }
        default:
            return state
    }
}

const printState = store => next => action => {
    console.log('dispatch之前打印state', store.getState());
    next(action)
    console.log('dispatch之后打印state', store.getState());
}

const printTime = store => next => action => {
    console.log('dispatch之前的时间戳', new Date().getTime());
    next(action)
    console.log('dispatch之后的时间戳', new Date().getTime());
}

const printNumber = store => next => action => {
    console.log('dispatch之前打印随机数', Math.random() * 1000);
    next(action)
    console.log('dispatch之后打印随机数', Math.random() * 10000);
}

// const store = applyMiddleware(printState, printTime, printNumber)(createStore)(reducer, initState)
const store = createStore(reducer, applyMiddleware(printState, printTime, printNumber))

store.dispatch({ type: 'INCREMENT', num: 6 })

/*
* 中间件的原理
* */
import {createStore, compose, applyMiddleware } from './redux'

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

// const store = createStore(reducer)

/*
* 实现在dispatch之前和之后分别打印state
* */

/*let next = store.dispatch

store.dispatch = action => {
    console.log('dispatch之前打印state', store.getState());
    next(action)
    console.log('dispatch之后打印state', store.getState());
}*/

// store.dispatch({ type: 'INCREMENT', num: 1 })

/*
* 实现在dispatch之前和之后分别打印当前的时间戳
* */
/*
let next1 = store.dispatch
store.dispatch = action => {
    console.log('dispatch之前的时间戳', new Date().getTime());
    next1(action)
    console.log('dispatch之后的时间戳', new Date().getTime());
}*/

// store.dispatch({ type: 'INCREMENT', num: 1 })
/*
* 实现在dispatch之前和之后分别打印一个随机数
* */
/*let next2 = store.dispatch

store.dispatch = action => {
    console.log('dispatch之前打印随机数', Math.random() * 1000);
    next2(action)
    console.log('dispatch之后打印随机数', Math.random() * 10000);
}

store.dispatch({ type: 'INCREMENT', num: 1 })*/

/*--------------------------------------------------------------------------------------------------------------------------------*/
/*
* 每次都要重新获取前面改写的dispatch,太麻烦,而且如果很多需求就写爆炸了
* 每次都要重新获取最新的store.dispatch,不如当做参数穿进去
* */

/*const printState = next => action => {
    console.log('dispatch之前打印state', store.getState());
    next(action)
    console.log('dispatch之后打印state', store.getState());
}

const printTime = next => action => {
    console.log('dispatch之前的时间戳', new Date().getTime());
    next(action)
    console.log('dispatch之后的时间戳', new Date().getTime());
}

const printNumber = next => action => {
    console.log('dispatch之前打印随机数', Math.random() * 1000);
    next(action)
    console.log('dispatch之后打印随机数', Math.random() * 10000);
}*/

/*
* 每个函数都要获取dispatch
*
* dispatch1 = printState(store.dispatch) 返回的就是一个接受action的dispatch,就相当于被改造过的第一个 dispatch
* printTime接受的next就是改造后的dispatch  printState(dispatch1) => 就是  dispatch2 = printTime(printState(store.dispatch))
* printNumber 同理 printNumber(dispatch2) => 就是 printNumber(printTime(printState(store.dispatch)))
* */
/*
store.dispatch = printNumber(printTime(printState(store.dispatch)))

store.dispatch({ type: 'INCREMENT', num: 1 })
*/


/*
* 中间件中包含了外部变量store,我们希望将store独立出来,所以store我们也通过参数穿进去
* */

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

/*const printStateMiddleware = printState(store),
    printTimeMiddleware = printTime(store),
    printNumberMiddleware = printNumber(store)

const next = store.dispatch
store.dispatch = printNumberMiddleware(printTimeMiddleware(printStateMiddleware(next)))

store.dispatch({ type: 'INCREMENT', num: 1 })*/

/*
* 我们只需要知道三个中间件，剩下的细节都可以封装起来
* */

// const applyMiddleware = (...middlewares) => {
//     return createStore => {
//         return (reducer, initState) => {
//             const store = createStore(reducer, initState),
//                 /*
//                 * 这一步就是生成一个接受next参数,并返回dispatch方法的函数数组
//                 * chain里面就相当于 [printStateMiddleware, printTimeMiddleware,printNumberMiddleware]
//                 * */
//                 chain = middlewares.map(middleware => middleware(store)),
//                 next = store.dispatch,
//                 dispatch = compose(...chain)(next)
//             store.dispatch = dispatch
//             return store
//         }
//     }
// }

const store = applyMiddleware(printState, printTime, printNumber)(createStore)(reducer)

store.dispatch({ type: 'INCREMENT', num: 1 })

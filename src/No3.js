import { combineReducers } from './redux'

/**
 * 
 * @param {初始state} initState 
 * NO1.最简单版本的
 * No2.对修改值添加约束,并且增加取消订阅函数
 * No3.添加reducer拆分和合并(处理多个reducer)
 */

const createStore = (reducer,initState) => {
    let state = initState,
        listeners = []
    function subscribe(fn) {
        listeners.push(fn)
        return function unsubscribe() {
            const index = listeners.findIndex(f => f == fn)
            listeners.splice(index, 1)
        }
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }
    function getState() {
        return state
    }
    // dispatch一个不匹配的值,来返回初始state
    dispatch({ type: Symbol() })
    return {
        subscribe,
        getState,
        dispatch
    }
}

// function combineReducers(reducers) {
//     // 获取reducer名称数组[count, info]
//     const reducerKeyAry = Object.keys(reducers)
//     return (state = {}, action) => {
//         const result = {}
//         // reducerKey: 分别是count info
//         reducerKeyAry.forEach(reducerKey => {
//             // 取出原reducer传入的state, 分别是 { number: 0}/ {title: '标题}
//             const oldState = state[reducerKey],
//             // 获取到每个reducer,分别是countReducer和infoReducer
//                 oldReducer = reducers[reducerKey]
//             result[reducerKey] = oldReducer(oldState, action)
//         })
//         return result
//     }
// }
const countState = {
    number: 1
}
function countReducer(state, action) {
    if(!state) state = countState
    switch(action.type) {
        case 'INCREMENT':
            return {
                number: state.number + action.num
            }
        default:
            return state
    }
}

const infoState = {
    title: '的方式'
}
function infoReducer(state, action) {
    if(!state) state = infoState
    switch(action.type) {
        case 'CHANGE_TITLE':
            return {
                title: action.title
            }
        default:
            return state
    }
}
// state可以开拆分开来写
// const initState = {
//     count: {
//         number: 2
//     },
//     info: {
//         title: '标题'
//     }
// }
const reducer = combineReducers({
    count: countReducer, 
    info: infoReducer 
})
const store = createStore(reducer)

store.subscribe(_ => {
    const state = store.getState()
    console.log(state, state.count, state.info);
})

store.dispatch({
    type: 'INCREMENT', num: 3
})
store.dispatch({
    type: 'CHANGE_TITLE', title: 'sfsd'
})
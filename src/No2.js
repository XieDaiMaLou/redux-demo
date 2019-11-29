/**
 * 
 * @param {初始state} initState 
 * NO1.最简单版本的
 * No2.对修改值添加约束
 */
const createStore = (reducer,initState) => {
    let state = initState || {},
        listeners = []
    function subscribe(fn) {
        listeners.push(fn)
    }
    /**
     * 
     * 修改dispatch派发动作改值的方式
     */
    // function dispatch(newState) {
    //     state = newState
    //     listeners.forEach(fn => fn())
    // }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }
    function getState() {
        return state
    }
    return {
        subscribe,
        getState,
        dispatch
    }
}
function reducer(state = { number: 0}, action) {
    switch(action.type) {
        case 'INCREMENT':
            return {
                number: state.number + action.num
            }
        default:
            return state
    }
}

const initState = { number: 0 }

const store = createStore(reducer, initState)

store.subscribe(_ => {
    console.log('现在的state是', store.getState());
})

store.dispatch({ type: 'INCREMENT', num: 6 })
store.dispatch({ type: 'INCREMENT', num: 5 })
store.dispatch({ number: 999 }) // 现在这个就不会生效了,state 还是上次修改返回的结果
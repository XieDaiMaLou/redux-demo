
/**
 * 
 * @param {初始state} initState 
 * NO1.最简单版本的
 * No2.对修改值添加约束
 * No3.添加reducer拆分和合并
 */
const createStore = (reducer,initState) => {
    let state = initState || {},
        listeners = []
    function subscribe(fn) {
        listeners.push(fn)
    }
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
                number: state.number + action.payload
            }
        default:
            return state
    }
}
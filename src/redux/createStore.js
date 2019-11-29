const createStore = (reducer, initState, enhancer) => {
    /*
    * 有时候不想传入默认的state
    * */
    if(typeof initState === 'function') {
        enhancer = initState
        initState = undefined
    }
    /*
    * 增强器来增强createStore功能
    * */
    if(enhancer && typeof enhancer === 'function') {
        const newCreateStore = enhancer(createStore)
        return newCreateStore(reducer, initState)
    }
    let state = initState,
        listeners = [];
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
        subscribe,
        dispatch
    }
}

export default createStore
/**
 * 
 * @param {初始state} initState 
 * NO1.最简单版本的
 */
const createStore = (initState) => {
    let state = initState || {},
        listeners = []
    function subscribe(fn) {
        listeners.push(fn)
    }
    function dispatch(newState) {
        state = newState
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

// const initState = {
//     count: 0
// }

// const store = createStore(initState)

// store.subscribe(_ => {
//     console.log('state is Change', store.getState());
// })

// store.dispatch({
//     count: 2
// })
// // 这个行为不应该被认可,因为随意改变state为其它的数据了
// store.dispatch({
//     aa: 1
// })

const initState = {
    count: {
        number: 0
    },
    info: {
        title: '嘻嘻',
        content: '发的给对方'
    }
}

const store = createStore(initState)

store.subscribe(_ => {
    console.log(store.getState()) 
})

store.dispatch({
    ...store.getState(),
    info: {
        title: '我要修改你'
    }
})
store.dispatch({
    ...store.getState(),
    count: {
        number: 22
    }
})
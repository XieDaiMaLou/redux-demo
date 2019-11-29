import compose from './compose'

const applyMiddleware = function(...middlewares) {
    return function(oldCreateStore) {
        //生成新的createStore方法回去
        return function newCreateStore(reducer, initState) {
            const store = oldCreateStore(reducer, initState),
                { dispatch, getState } = store,
                /*
                * 这里没有将整个store传进去,因为不想让在业务逻辑内部可以去修改store的内部方法
                * */
                chain = middlewares.map(middleware => middleware({ getState })),
                next = compose(...chain)(dispatch)
            store.dispatch = next
            return store
        }
    }
}

export default applyMiddleware
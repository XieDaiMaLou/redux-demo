export default (reducers) => {
    // 获取到传入reducers对象的key数组
    const reducerKeys = Object.keys(reducers)
    return (state = {}, action) => {
        const result = {}
        reducerKeys.forEach(reducerKey => {
            // 获取到每个reducerKey对应的state
            const oldState = state[reducerKey],
            // 获取到每个reducer
                oldReducer = reducers[reducerKey]
            // 获取每个reducer处理对应的state和actio返回的新的state,并且赋值给reducerKey
            result[reducerKey] = oldReducer(oldState, action)
        })
        return result
    }
}

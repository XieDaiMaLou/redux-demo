function bindActionCreator(actionCreator, dispatch) {
    return function(...args) {
        return dispatch(actionCreator.call(this, ...args))
    }
}

export default function bindActionCreators(actionCreators, dispatch) {
    if(typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    if(typeof actionCreators !== 'object' || actionCreators == null) {
        throw new Error('actionCreators must be a Function or Object')
    }
    let result = {}
    for (let key in actionCreators) {
        const actionCreator = actionCreators[key]
        if(typeof actionCreator === 'function') {
            result[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return result
}
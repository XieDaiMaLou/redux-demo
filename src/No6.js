import { createStore, combineReducers, bindActionCreators } from './redux'

const counter = {
    number: 0
}

function counterReducer(state = counter, action) {
    switch(action.type) {
        case 'INCREMENT':
            return {
                number: state.number + action.num
            }
        default:
            return state
    }
}

const color = {
    color: 'red'
}

function colorReducer(state = color, action) {
    switch(action.type) {
        case 'CHANGE_COLOR':
            return {
                color: action.newColor
            }
        default:
            return state
    }
}

const reducer = combineReducers({
    counter: counterReducer,
    color: colorReducer
})

function incrementAction() {
    return { type: 'INCREMENT', num: 2}
}
function changeColorAction() {
    return { type: 'CHANGE_COLOR', newColor: '#ddd'}
}

const store = createStore(reducer)

/*
* 在ations中,每个有重复的逻辑,都需要store.dispatch,这个每个函数都有
* 这个actions我们可以通过一个公用的方法来实现
* */
// const actions = {
//     increment: (...args) => {
//         return store.dispatch(incrementAction.call(null, ...args))
//     },
//     changeColor: (...args) => {
//         return store.dispatch(changeColorAction.call(null, ...args))
//     }
// }

/*function bindActionCreator(actionCreator, dispatch) {
    return function (...args) {
        return dispatch(actionCreator.call(this, ...args))
    }
}

const bindActionCreators = (actionCreators, dispatch) => {
    if(typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    if(typeof actionCreators !== 'object' || actionCreators == null) {
        throw new Error()
    }
    const result = {}
    for(let key in actionCreators) {
        const actionCreator = actionCreators[key]
        if(typeof actionCreator === 'function') {
            result[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return result
}*/
const a = bindActionCreators({incrementAction, changeColorAction}, store.dispatch);

store.subscribe(_ => {
    console.log(store.getState(), 'UPDATE STATE');
})

// actions.increment()

// actions.changeColor()

a.incrementAction()
a.changeColorAction()
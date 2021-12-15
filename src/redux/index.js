import {createStore} from './createStore'
import {initialState} from './initialState'
import {rootReducer} from './rootReducer'

export const store = createStore(rootReducer, initialState)

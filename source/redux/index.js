// @flow

import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import {app, type State as AppState} from './reducer'

export {init as initRedux} from './init'

export type ReduxState = {
	app?: AppState,
}

export const makeStore = () => {
	const randomAnimals: any = combineReducers({
		app,
	})

	const middleware = [reduxPromise, reduxThunk]

	if (__DEV__) {
		const logger = createLogger({
			collapsed: true,
			duration: true,
			// avoid logging the (large) course data state twice per action
		})
		middleware.push(logger)
	}

	return createStore(randomAnimals, applyMiddleware(...middleware))
}

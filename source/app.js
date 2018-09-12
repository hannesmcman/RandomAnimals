// @flow

import * as React from 'react'
import {AppNavigator} from './navigation'
import {makeStore, initRedux} from './redux'
import {Provider} from 'react-redux'

const store = makeStore()
initRedux(store)

type Props = {}

export default class App extends React.Component<Props> {
	render() {
		return (
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		)
	}
}

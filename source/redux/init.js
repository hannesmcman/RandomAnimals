/**
 * @flow
 * Functions to initialize bits of the global state, as appropriate
 */

import {loadFavoriteImages} from './reducer'

export async function init(store: {dispatch: any => any}) {
	await store.dispatch(loadFavoriteImages())
}

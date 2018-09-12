// @flow

import * as storage from '../lib/storage'
import type {ReduxState} from './index'

type Dispatch<A: Action> = (action: A | Promise<A> | ThunkAction<A>) => any
type GetState = () => ReduxState
type ThunkAction<A: Action> = (dispatch: Dispatch<A>, getState: GetState) => any

const LOAD_FAVORITE_IMAGES = 'app/LOAD_FAVORITE_IMAGES'

type LoadFavoriteImagesAction = {
	type: 'app/LOAD_FAVORITE_IMAGES',
	payload: string[],
}

export async function loadFavoriteImages(): Promise<LoadFavoriteImagesAction> {
	const favoriteImages = await storage.getFavoriteImages()
	return {type: LOAD_FAVORITE_IMAGES, payload: favoriteImages}
}

const UPDATE_FAVORITE_IMAGES = 'app/UPDATE_FAVORITE_IMAGES'

type UpdateFavoriteImagesAction = {
	type: 'app/UPDATE_FAVORITE_IMAGES',
	payload: string[],
}

export function updateFavoriteImages(
	imageUrl: string,
): ThunkAction<UpdateFavoriteImagesAction> {
	return (dispatch, getState) => {
		const state = getState()

		let favoriteImages = state.app ? state.app.favoriteImages : []

		if (favoriteImages.includes(imageUrl)) {
			return
		}

		favoriteImages = [imageUrl, ...favoriteImages]

		storage.setFavoriteImages(favoriteImages)

		dispatch({type: UPDATE_FAVORITE_IMAGES, payload: favoriteImages})
	}
}

const initialState = {
	favoriteImages: [],
}

type Action = LoadFavoriteImagesAction | UpdateFavoriteImagesAction

export type State = {
	favoriteImages: string[],
}

export function app(state: State = initialState, action: Action) {
	switch (action.type) {
		case LOAD_FAVORITE_IMAGES:
			return {...state, favoriteImages: action.payload}

		case UPDATE_FAVORITE_IMAGES:
			return {...state, favoriteImages: action.payload}

		default:
			return state
	}
}

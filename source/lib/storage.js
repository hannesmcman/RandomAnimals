// @flow

import {AsyncStorage} from 'react-native'

let prefix: string

export function clearAsyncStorage() {
	return AsyncStorage.clear()
}

export function setStoragePrefix(str: string) {
	prefix = str
}

/// MARK: Utilities

function setItem(key: string, value: mixed) {
	return AsyncStorage.setItem(`${prefix}:${key}`, JSON.stringify(value))
}
function getItem(key: string): Promise<?any> {
	return AsyncStorage.getItem(`${prefix}:${key}`).then(stored =>
		JSON.parse(stored),
	)
}
// function removeItem(key: string): Promise<void> {
// 	return AsyncStorage.removeItem(`${prefix}:${key}`)
// }

/// MARK: Typed utility functions
// These simply cast the return value of getItem; they provide no runtime
// guarantees.

// async function getItemAsBoolean(key: string): Promise<boolean> {
// 	return (await getItem(key)) || false
// }
async function getItemAsArray<T>(key: string): Promise<Array<T>> {
	return (await getItem(key)) || []
}

setStoragePrefix('randomAnimals:')

/// MARK: Favorite Images

const favoriteImagesKey = 'app:favorite-images'
export function setFavoriteImages(imageUrls: string[]) {
	return setItem(favoriteImagesKey, imageUrls)
}
export function getFavoriteImages(): Promise<Array<string>> {
	return getItemAsArray(favoriteImagesKey)
}

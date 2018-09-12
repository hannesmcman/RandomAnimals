// @flow

export const fetchRandomAnimalImage = async (api: any) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'x-api-key': api.key ? api.key : '',
	})
	const response = await fetch(api.url, {headers: headers})
	let responseJson = await response.json()
	if (responseJson.length) {
		responseJson = responseJson[0]
	}
	const url = responseJson[api.urlProp]
	const httpsUrl = url.replace('http:', 'https:')
	return httpsUrl
}

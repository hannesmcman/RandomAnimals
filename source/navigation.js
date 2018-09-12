// @flow

import {createStackNavigator, createDrawerNavigator} from 'react-navigation'
import {AnimalView, AnimalImageView} from './views/animal-view'
import {FavoritesView} from './views/favorites-view'
import * as c from './views/colors'

const stackNavigatorOptions = {
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#f4511e',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	},
}

const HomeNavigator = createStackNavigator(
	{
		Home: AnimalView,
		AnimalImageView: AnimalImageView,
	},
	{
		initialRouteName: 'Home',
		...stackNavigatorOptions,
	},
)

const FavoritesNavigator = createStackNavigator(
	{
		Favorites: FavoritesView,
		AnimalImageView: AnimalImageView,
	},
	{
		initialRouteName: 'Favorites',
		...stackNavigatorOptions,
	},
)

export const AppNavigator = createDrawerNavigator(
	{
		Home: HomeNavigator,
		Favorites: FavoritesNavigator,
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			drawerLabel: 'Home',
		},
		drawerBackgroundColor: c.darkGrey,
		drawerWidth: 200,
		contentOptions: {
			inactiveTintColor: c.grey,
			activeTintColor: c.white,
			labelStyle: {
				color: c.white,
			},
		},
	},
)

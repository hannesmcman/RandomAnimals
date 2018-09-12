// @flow

import React from 'react'
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import {FavoritePictureRow} from './row'
import type {TopLevelViewPropsType} from '../types'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import type {ReduxState} from '../../redux'

type ReduxStateProps = {
	favoriteImages: string[],
}

type Props = TopLevelViewPropsType & ReduxStateProps

class FavoritesView extends React.Component<Props> {
	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Favorites!',
			headerLeft: (
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<Icon name="ios-menu" size={30} style={styles.header} />
				</TouchableOpacity>
			),
		}
	}

	_keyExtractor = item => item

	_renderItem = ({item}) => (
		<FavoritePictureRow navigation={this.props.navigation} url={item} />
	)

	render() {
		return (
			<FlatList
				data={this.props.favoriteImages}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		paddingLeft: 10,
	},
})

function mapStateToProps(state: ReduxState): ReduxStateProps {
	return {
		favoriteImages: state.app ? state.app.favoriteImages : [],
	}
}

export const ConnectedFavoritesView = connect(mapStateToProps)(FavoritesView)

// @flow

import React from 'react'
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native'
import type {TopLevelViewPropsType} from '../types'

type Props = TopLevelViewPropsType & {
	url: string,
}

export class FavoritePictureRow extends React.PureComponent<Props> {
	_onCategoryPress = () => {
		// this.props.navigation.navigate('AnimalImageView', this.props.animal)
	}

	render() {
		return (
			<TouchableOpacity onPress={this._onCategoryPress}>
				<View style={styles.container}>
					<View style={styles.imageContainer}>
						<Image source={{uri: this.props.url}} style={styles.image} />
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 200,
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
	},
	imageContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
})

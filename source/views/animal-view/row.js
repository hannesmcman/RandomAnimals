// @flow

import React from 'react'
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import type {TopLevelViewPropsType} from '../types'
import * as c from '../colors'

type Props = TopLevelViewPropsType & {
	animal: {name: string, img: string},
}

export class AnimalRow extends React.PureComponent<Props> {
	_onCategoryPress = () => {
		this.props.navigation.navigate('AnimalImageView', this.props.animal)
	}

	render() {
		return (
			<TouchableOpacity onPress={this._onCategoryPress}>
				<View style={styles.container}>
					<View style={styles.imageContainer}>
						<Image source={{uri: this.props.animal.img}} style={styles.image} />
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{this.props.animal.name}</Text>
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
	text: {
		textAlign: 'left',
		fontSize: 30,
		color: c.white,
	},
	textContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingLeft: 10,
		paddingTop: 10,
	},
})

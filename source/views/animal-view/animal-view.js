// @flow

import React from 'react'
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import * as animalData from '../../data/animals'
import {AnimalRow} from './row'
import type {TopLevelViewPropsType} from '../types'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = TopLevelViewPropsType

export class AnimalView extends React.Component<Props> {
	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Animals!',
			headerLeft: (
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<Icon name="ios-menu" size={30} style={styles.header} />
				</TouchableOpacity>
			),
		}
	}

	_keyExtractor = item => item.name

	_renderItem = ({item}) => (
		<AnimalRow animal={item} navigation={this.props.navigation} />
	)

	render() {
		return (
			<FlatList
				data={animalData.animals}
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

// @flow

import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	ActivityIndicator,
	Alert,
} from 'react-native'
import type {TopLevelViewPropsType} from '../types'
import {fetchRandomAnimalImage} from '../../lib/fetch-random-image'
import Button from 'react-native-button'
import * as c from '../colors'
import {connect} from 'react-redux'
import type {ReduxState} from '../../redux'
import {updateFavoriteImages} from '../../redux/reducer'

type ReduxStateProps = {
	favoriteImages: string[],
}

type ReduxDispatchProps = {
	updateFavoriteImages: (imageUrl: string) => any,
}

type Props = TopLevelViewPropsType & ReduxStateProps & ReduxDispatchProps

type State = {
	imageUrl: string,
	loading: boolean,
}

class AnimalImageView extends React.PureComponent<Props, State> {
	static navigationOptions = ({navigation}: any) => ({
		title: navigation.state.params.name,
	})

	state = {
		imageUrl: '',
		loading: true,
	}

	componentDidMount() {
		this.getRandomImage()
	}

	getRandomImage = async () => {
		this.setState(() => ({loading: true}))
		const {api} = this.props.navigation.state.params
		const newImageUrl = await fetchRandomAnimalImage(api)
		this.setState(() => ({imageUrl: newImageUrl, loading: false}))
	}

	saveImage = () => {
		this.props.updateFavoriteImages(this.state.imageUrl)
		Alert.alert(
			'Cute Picture Saved',
			'Check out your saved picture in the favorites section.',
		)
	}

	render() {
		const {imageUrl, loading} = this.state
		return (
			<View style={styles.container}>
				<View style={styles.imageSection}>
					<View style={styles.imageContainer}>
						{loading ? (
							<View style={styles.loadingContainer}>
								<ActivityIndicator style={styles.spinner} />
								<Text>Loading...</Text>
							</View>
						) : (
							<Image source={{uri: imageUrl}} style={styles.image} />
						)}
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						containerStyle={styles.button}
						onPress={this.getRandomImage}
						style={styles.buttonText}
					>
						Another!
					</Button>
					<Button
						containerStyle={styles.button}
						onPress={this.saveImage}
						style={styles.buttonText}
					>
						Save!
					</Button>
				</View>
			</View>
		)
	}
}

function mapStateToProps(state: ReduxState): ReduxStateProps {
	return {
		favoriteImages: state.app ? state.app.favoriteImages : [],
	}
}

function mapDispatchToProps(dispatch): ReduxDispatchProps {
	return {
		updateFavoriteImages: (imageUrl: string) =>
			dispatch(updateFavoriteImages(imageUrl)),
	}
}

export const ConnectedAnimalImageView = connect(
	mapStateToProps,
	mapDispatchToProps,
)(AnimalImageView)

const styles = StyleSheet.create({
	button: {
		backgroundColor: c.cherry,
		alignSelf: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginVertical: 10,
		borderRadius: 6,
		overflow: 'hidden',
	},
	buttonContainer: {
		marginTop: 10,
	},
	buttonText: {
		color: c.white,
	},
	container: {
		backgroundColor: c.white,
		flex: 1,
		justifyContent: 'center',
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
	imageSection: {
		height: 400,
	},
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	spinner: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8,
	},
})

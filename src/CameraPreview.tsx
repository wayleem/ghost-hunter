import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { cameraStatus } from '../types'
import { store } from '../store'
import * as action from '../actions'

export default function CameraPreview() {
	const capturedImage = useSelector((state: cameraStatus) => state.capturedImage)
	const detection = store.getState().detection
	const dispatch = useDispatch()
	const navigation = useNavigation<BottomTabNavigationProp<ParamListBase>>()

	const __savePhoto = () => {
		dispatch(action.addPhoto(capturedImage.uri))
		dispatch(action.setCapturedImage(""))
		dispatch(action.decrementGhost(1))
		dispatch(action.incrementCaught(1))

		navigation.navigate('CameraView')
	}

	const __retakePicture = () => {
		dispatch(action.setCapturedImage(""))
		navigation.navigate('CameraView')
	}

	return (
		<View
			style={{
				backgroundColor: 'transparent',
				flex: 1,
				width: '100%',
				height: '100%',
			}}>

			<ImageBackground
				source={{ uri: capturedImage && capturedImage.uri }}
				style={{
					flex: 1,
				}}>

				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						padding: 15,
						justifyContent: 'flex-end',
					}}>
					{detection &&
						< Text
							style={{
								fontSize: 100,

								height: 100,
								width: 100,

								marginBottom: 250,
								alignSelf: 'center',
							}}>
							👻
						</Text>}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',

						}}>

						<TouchableOpacity
							onPress={__retakePicture}
							style={{
								width: 130,
								height: 40,

								alignItems: 'center',
								borderRadius: 4,
							}}>
							<Text
								style={{
									color: '#fff',
									fontSize: 20,
								}}>
								Re-take
							</Text>
						</TouchableOpacity>
						{detection &&
							<TouchableOpacity
								onPress={__savePhoto}
								style={{
									width: 130,
									height: 40,

									alignItems: 'center',
									borderRadius: 4,
								}}>
								<Text
									style={{
										color: '#fff',
										fontSize: 20,
									}}>
									save photo
								</Text>
							</TouchableOpacity>
						}
					</View>
				</View>
			</ImageBackground >
		</View >
	)
}

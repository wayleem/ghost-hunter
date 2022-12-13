import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Camera, PermissionStatus } from 'expo-camera'
import { cameraStatus } from '../types'
import * as action from '../actions'
import CameraPreview from './CameraPreview'
import CameraView from './CameraView'
import PhotoCollection from './PhotoCollection'

export default function Main() {
	const ghostCount = useSelector((state: cameraStatus) => state.ghostCount)
	const dispatch = useDispatch()
	const Tab = createBottomTabNavigator()

	const __startCamera = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		if (status === PermissionStatus.GRANTED) {
			dispatch(action.setStartCamera(true))
		} else {
			Alert.alert('Access denied')
		}
	}

	function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const __handleDetection = async () => {
		let num
		while (ghostCount > 0) {
			await delay(10000)
			num = Math.floor(Math.random() * 100)
			if (num <= 25) {
				dispatch(action.setDetection(true))
			} else {
				dispatch(action.setDetection(false))
			}
		}
	}

	__handleDetection()

	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="CameraView">
				<Tab.Screen name="CameraView" component={CameraView} initialParams={{
				}} listeners={{
					tabPress: e => {
						__startCamera()
					},
				}} />
				<Tab.Screen name="CameraPreview" component={CameraPreview} />
				<Tab.Screen name="PhotoCollection" component={PhotoCollection} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}
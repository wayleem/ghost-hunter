import { StatusBar } from 'expo-status-bar'
import { useSelector, useDispatch } from 'react-redux'
import { cameraStatus } from '../types'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Camera, CameraType, FlashMode, PermissionStatus } from 'expo-camera'
import * as action from '../actions'
import CameraPreview from './CameraPreview'
import CameraView from './CameraView'
import Start from './Start'
import PhotoCollection from './PhotoCollection'
import { Navigate } from 'react-router'

let camera: Camera

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default function Main() {
	const startCamera = useSelector((state: cameraStatus) => state.startCamera)
	const previewVisible = useSelector((state: cameraStatus) => state.previewVisible)
	const capturedImage = useSelector((state: cameraStatus) => state.capturedImage)
	const cameraType = useSelector((state: cameraStatus) => state.cameraType)
	const flashMode = useSelector((state: cameraStatus) => state.flashMode)
	const collectionVisible = useSelector((state: cameraStatus) => state.collectionVisible)
	const detection = useSelector((state: cameraStatus) => state.detection)
	const dispatch = useDispatch()

	const __startCamera = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		if (status === PermissionStatus.GRANTED) {
			dispatch(action.setStartCamera(true))
			Navigate({ to: "CameraView" })
			console.log("click")
		} else {
			Alert.alert('Access denied')
		}
	}

	const __takePicture = async () => {
		const photo: any = await camera.takePictureAsync()
		dispatch(action.setPreviewVisible(true))
		Navigate({ to: "CameraView" })
		dispatch(action.setCapturedImage(photo))
	}

	const __savePhoto = () => {
		dispatch(action.addPhoto(capturedImage))
		dispatch(action.setCapturedImage(""))
		dispatch(action.setPreviewVisible(false))
		__startCamera()
	}

	const __retakePicture = () => {
		dispatch(action.setCapturedImage(""))
		dispatch(action.setPreviewVisible(false))
		__startCamera()
	}

	const __switchCamera = () => {
		if (cameraType === 'back') {
			dispatch(action.setCameraType(CameraType.front))
		} else {
			dispatch(action.setCameraType(CameraType.back))
		}
	}

	const __handleFlashMode = () => {
		if (flashMode === 'on') {
			dispatch(action.setFlashMode(FlashMode.off))
		} else if (flashMode === 'off') {
			dispatch(action.setFlashMode(FlashMode.on))
		} else {
			dispatch(action.setFlashMode(FlashMode.auto))
		}
	}

	const __openCollection = () => {
		dispatch(action.setCollectionVisible(true))
	}

	const __handleDetection = () => {
		while (startCamera) {

		}
	}

	const Stack = createNativeStackNavigator()

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start" component={Start} initialParams={{ startCamera: __startCamera }} />
				<Stack.Screen name="CameraView" component={CameraView} initialParams={{
					cameraType: __startCamera,
					flashMode: flashMode,
					handleFlashMode: __handleFlashMode,
					takePicture: __takePicture,
					switchCamera: __switchCamera,
					openCollection: __openCollection,
					detection: detection
				}} />
				<Stack.Screen name="CameraPreview" component={CameraPreview} initialParams={{
					photo: capturedImage,
					retakePicture: __retakePicture,
					savePhoto: __savePhoto
				}} />
				<Stack.Screen name="PhotoCollection" component={PhotoCollection} initialParams={{ startCamera: __startCamera }} />
			</Stack.Navigator>
		</NavigationContainer>
	)
	/*
		return (
			<View style={styles.container}>
				{startCamera ? (
					<View
						style={{
							flex: 1,
							width: '100%',
						}}
					>
						{previewVisible && capturedImage ? (
							<CameraPreview
								photo={capturedImage}
								savePhoto={__savePhoto}
								retakePicture={__retakePicture}
							/>
						) : (<Camera
							type={cameraType}
							flashMode={flashMode}
							style={{ flex: 1 }}
							ref={(r: Camera) => {
								camera = r
							}}
						>
							<CameraView
								cameraType={cameraType}
								flashMode={flashMode}
								handleFlashMode={__handleFlashMode}
								takePicture={__takePicture}
								switchCamera={__switchCamera}
								openCollection={__openCollection}
								detection={detection}
							/>
						</Camera>
						)}
	
					</View>
				) : (
					<Start startCamera={__startCamera} />
				)}
			</View>
		)*/
}

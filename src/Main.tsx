import { StatusBar } from 'expo-status-bar'
import { useSelector, useDispatch } from 'react-redux'
import { cameraStatus } from '../types'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Camera, CameraType, FlashMode, PermissionStatus } from 'expo-camera'
import * as action from '../actions'
import CameraPreview from './CameraPreview'

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
	const previewVisible = useSelector(
		(state: cameraStatus) => state.previewVisible
	)
	const capturedImage = useSelector(
		(state: cameraStatus) => state.capturedImage
	)
	const cameraType = useSelector((state: cameraStatus) => state.cameraType)
	const flashMode = useSelector((state: cameraStatus) => state.flashMode)
	const collection = useSelector((state: cameraStatus) => state.collection)
	const dispatch = useDispatch()

	const __startCamera = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		if (status === PermissionStatus.GRANTED) {
			dispatch(action.setStartCamera(true))
		} else {
			Alert.alert('Access denied')
		}
	}

	const __takePicture = async () => {
		const photo: any = await camera.takePictureAsync()
		dispatch(action.setPreviewVisible(true))
		dispatch(action.setCapturedImage(photo))
	}

	const __savePhoto = () => {
		dispatch(action.addPhoto(capturedImage))
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

	const __openCollection = () => { }

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
					) : (
						<Camera
							type={cameraType}
							flashMode={flashMode}
							style={{ flex: 1 }}
							ref={(r: Camera) => {
								camera = r
							}}
						>
							<View
								style={{
									flex: 1,
									width: '100%',
									backgroundColor: 'transparent',
									flexDirection: 'row',
								}}
							>
								<View
									style={{
										position: 'absolute',
										left: '5%',
										top: '10%',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<TouchableOpacity
										onPress={__handleFlashMode}
										style={{
											backgroundColor: flashMode === 'off' ? '#000' : '#fff',
											borderRadius: 50,
											height: 25,
											width: 25,
										}}
									>
										<Text
											style={{
												fontSize: 20,
											}}
										>
											⚡️
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={__switchCamera}
										style={{
											marginTop: 20,
											borderRadius: 50,
											height: 25,
											width: 25,
										}}
									>
										<Text
											style={{
												fontSize: 20,
											}}
										>
											{cameraType === 'front' ? '🤳' : '📷'}
										</Text>
									</TouchableOpacity>
								</View>
								<View
									style={{
										position: 'absolute',
										bottom: 0,
										flexDirection: 'row',
										flex: 1,
										width: '100%',
										padding: 20,
										justifyContent: 'space-between',
									}}
								>
									<View
										style={{
											alignSelf: 'center',
											flex: 1,
											alignItems: 'center',
										}}
									>
										<TouchableOpacity
											onPress={__takePicture}
											style={{
												width: 70,
												height: 70,
												bottom: 0,
												borderRadius: 50,
												backgroundColor: '#fff',
											}}
										/>
									</View>
								</View>
							</View>
						</Camera>
					)}
				</View>
			) : (
				<View
					style={{
						flex: 1,
						backgroundColor: '#fff',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<TouchableOpacity
						onPress={__startCamera}
						style={{
							width: 130,
							borderRadius: 4,
							backgroundColor: '#14274e',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							height: 40,
						}}
					>
						<Text
							style={{
								color: '#fff',
								fontWeight: 'bold',
								textAlign: 'center',
							}}
						>
							Take picture
						</Text>
					</TouchableOpacity>
				</View>
			)}

			<StatusBar style="auto" />
		</View>
	)
}
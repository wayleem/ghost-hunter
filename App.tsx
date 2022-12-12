import { StatusBar } from 'expo-status-bar'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
let camera: Camera

export default function App() {
  const startCamera = useSelector((state) => state.startCamera.value)
  const previewVisible = useSelector((state) => state.previewVisible.value)
  const capturedImage = useSelector((state) => state.capturedImage.value)
  const cameraType = useSelector((state) => state.cameraType.value)
  const flashMode = useSelector((state) => state.flashMode.value)
  const dispatch = useDispatch()

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      dispatch({ type: "set_camera_permission", value: true })
    } else {
      Alert.alert("Access deniied")
    }
  }

  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync()
    dispatch({ type: "set_preview_visible", value: true })
    dispatch({ type: "set_captured_image", value: photo })
  }

  const __savePhoto = () => { }

  const __retakePicture = () => {
    dispatch({ type: "set_captured_image", value: null })
    dispatch({ type: "set_preview_visible", value: false })
    __startCamera()
  }

  const __switchCamera = () => {
    if (cameraType === "back") {
      dispatch({ type: "set_camera_type", value: CameraType.front })
    } else {
      dispatch({ type: "set_camera_type", value: CameraType.back })
    }
  }

  const __handleFlashMode = () => {
    if (flashMode === "on") {
      dispatch({ type: "set_flash_mode", value: "off" })
    } else if (flashMode === "off") {
      dispatch({ type: "set_flash_mode", value: "on" })
    } else {
      dispatch({ type: "set_flash_mode", value: "auto" })
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'} />
      </View>
      <Button title="Take Picture" onPress={() => takePicture()} />
      {image && <image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}
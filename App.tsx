import { StatusBar } from 'expo-status-bar'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { store } from "./store"
import { cameraStatus } from "./types"
import { Camera, CameraType, FlashMode } from 'expo-camera'
let camera: Camera
let persistor = persistStore(store)

export default function App() {
  const startCamera = useSelector((state: cameraStatus) => state.startCamera)
  const previewVisible = useSelector((state: cameraStatus) => state.previewVisible)
  const capturedImage = useSelector((state: cameraStatus) => state.capturedImage)
  const cameraType = useSelector((state: cameraStatus) => state.cameraType)
  const flashMode = useSelector((state: cameraStatus) => state.flashMode)
  const dispatch = useDispatch()

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      dispatch({ type: "set_camera_permission", value: true })
    } else {
      Alert.alert("Access denied")
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
      dispatch({ type: "set_flash_mode", value: FlashMode.off })
    } else if (flashMode === "off") {
      dispatch({ type: "set_flash_mode", value: FlashMode.on })
    } else {
      dispatch({ type: "set_flash_mode", value: FlashMode.auto })
    }
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          {startCamera ? (
            <View
              style={{
                flex: 1,
                width: '100%'
              }}
            >
              {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
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
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        left: '5%',
                        top: '10%',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
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
                            fontSize: 20
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
                          width: 25
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20
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
                        justifyContent: 'space-between'
                      }}
                    >
                      <View
                        style={{
                          alignSelf: 'center',
                          flex: 1,
                          alignItems: 'center'
                        }}
                      >
                        <TouchableOpacity
                          onPress={__takePicture}
                          style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff'
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
                alignItems: 'center'
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
                  height: 40
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Take picture
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

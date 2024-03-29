import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { useSelector, useDispatch } from 'react-redux'
import { cameraStatus } from '../types'
import * as action from '../actions'


let camera: Camera
export default function CameraView() {
    const cameraType = useSelector((state: cameraStatus) => state.cameraType)
    const flashMode = useSelector((state: cameraStatus) => state.flashMode)
    const detection = useSelector((state: cameraStatus) => state.detection)
    const ghostCaught = useSelector((state: cameraStatus) => state.ghostCaught)
    const dispatch = useDispatch()
    const navigation = useNavigation<BottomTabNavigationProp<ParamListBase>>()

    const __takePicture = async () => {
        const photo: any = await camera.takePictureAsync()
        dispatch(action.setPreviewVisible(true))
        dispatch(action.setCapturedImage(photo))
        navigation.navigate('CameraPreview')
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

    return (
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PhotoCollection')}
                        style={{
                            marginTop: 40,
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
                            📙
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => dispatch(action.setDetection(true))}
                        style={{
                            backgroundColor: detection ? '#ff0000' : '#fff',
                            marginTop: 60,
                            borderRadius: 50,
                            height: 25,
                            width: 25,
                        }}
                    />
                    <Text style={{
                        marginTop: 10,
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>
                        {ghostCaught}/5
                    </Text>
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
    )
}
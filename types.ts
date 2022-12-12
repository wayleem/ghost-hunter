import { Image } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'

export interface cameraStatus {
    startCamera: boolean,
    previewVisible: boolean,
    capturedImage: any,
    cameraType: CameraType,
    flashMode: FlashMode,
}
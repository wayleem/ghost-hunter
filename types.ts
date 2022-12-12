import { Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'

export enum permission {
    granted = "granted",
    denied = "denied"
}

export interface cameraStatus {
    startCamera: boolean,
    previewVisible: boolean,
    capturedImage: any,
    cameraType: CameraType,
    flashMode: string
}
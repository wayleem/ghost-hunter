import { Image } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'

export interface cameraStatus {
    startCamera: boolean,
    capturedImage: any,
    cameraType: CameraType,
    flashMode: FlashMode,
    collection: any[],
    detection: boolean,
    ghostCount: number,
    ghostCaught: number
}

export interface photo {
    capturedImage: any,
    description: string,
    date: Date
}
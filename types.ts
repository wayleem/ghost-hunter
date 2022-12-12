import { Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'

export enum permission {
    granted = "granted",
    denied = "denied"
}

export interface cameraStatus {
    hasCameraPermission: permission,
    camera: Camera,
    image: Image,
    type: CameraType
}
import { createAction } from '@reduxjs/toolkit'
import { permission } from './types'
import { Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'


export const setStartCamera = createAction<boolean>("set_start_camera")

export const setPreviewVisible = createAction<boolean>("set_preview_visible")

export const setCapturedImage = createAction<any>("set_captured_image")

export const setCameraType = createAction<CameraType>("set_camera_type")

export const setFlashMode = createAction<string>("set_flash_mode")
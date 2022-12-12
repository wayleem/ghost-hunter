import { createAction } from '@reduxjs/toolkit'
import { CameraType, FlashMode } from 'expo-camera'


export const setStartCamera = createAction<boolean>("set_start_camera")

export const setPreviewVisible = createAction<boolean>("set_preview_visible")

export const setCapturedImage = createAction<string>("set_captured_image")

export const setCameraType = createAction<CameraType>("set_camera_type")

export const setFlashMode = createAction<FlashMode>("set_flash_mode")

export const addPhoto = createAction<any>("add_photo")
import { configureStore, createReducer } from "@reduxjs/toolkit"
import { Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { cameraStatus, permission } from './types'
import * as action from './actions'

export type State = cameraStatus

const INITIAL_STATE: State = {
    hasCameraPermission: permission.denied,
    camera: null,
    image: null,
    type: CameraType.back
}

const storeReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(action.setCameraPermission, (state, action) => {
            state.hasCameraPermission = action.payload
        })
})


export const store = configureStore({
    reducer: storeReducer
})
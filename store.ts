import { configureStore, createReducer, getDefaultMiddleware } from "@reduxjs/toolkit"
import { CameraType, FlashMode } from 'expo-camera'
import { cameraStatus } from './types'
import * as action from './actions'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"

export type State = cameraStatus

const INITIAL_STATE: State = {
    startCamera: false,
    previewVisible: false,
    capturedImage: null,
    cameraType: CameraType.back,
    flashMode: FlashMode.off,
    collectionVisible: false,
    collection: [],
    detection: false

}

const storeReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(action.setStartCamera, (state, action) => {
            state.startCamera = action.payload
        })
        .addCase(action.setPreviewVisible, (state, action) => {
            state.previewVisible = action.payload
        })
        .addCase(action.setCapturedImage, (state, action) => {
            state.capturedImage = action.payload
        })
        .addCase(action.setCameraType, (state, action) => {
            state.cameraType = action.payload
        })
        .addCase(action.setFlashMode, (state, action) => {
            state.flashMode = action.payload
        })
        .addCase(action.addPhoto, (state, action) => {
            state.collection.push(action.payload)
        })
        .addCase(action.setDetection, (state, action) => {
            state.detection = action.payload
        })
        .addCase(action.setCollectionVisible, (state, action) => {
            state.collectionVisible = action.payload
        })
})


export const store = configureStore({
    reducer: storeReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})
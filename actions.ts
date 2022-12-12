import { createAction } from '@reduxjs/toolkit'
import { permission } from './types'

export const setCameraPermission = createAction<permission>("set_camera_permission")


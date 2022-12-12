import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { cameraStatus, permission } from './types'

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(permission.denied)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(CameraType.back)

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(permission.granted)
    })()
  }, [])

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.url)
    }
  }

  if (hasCameraPermission === permission.denied) {
    return <Text>No Camera Access</Text>
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'} />
      </View>
      <Button title="Take Picture" onPress={() => takePicture()} />
      {image && <image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
});

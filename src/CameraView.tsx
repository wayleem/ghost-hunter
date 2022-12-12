import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { Camera, CameraType, FlashMode, PermissionStatus } from 'expo-camera'

export default function CameraView({
    cameraType,
    flashMode,
    handleFlashMode,
    takePicture,
    switchCamera,
    openCollection,
    detection

}: any) {
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'transparent',
                flexDirection: 'row',
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity
                    onPress={handleFlashMode}
                    style={{
                        backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                        borderRadius: 50,
                        height: 25,
                        width: 25,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        ⚡️
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={switchCamera}
                    style={{
                        marginTop: 20,
                        borderRadius: 50,
                        height: 25,
                        width: 25,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openCollection}
                    style={{
                        marginTop: 40,
                        borderRadius: 50,
                        height: 25,
                        width: 25,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        📙
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        alignSelf: 'center',
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={takePicture}
                        style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff',
                        }}
                    />
                </View>
            </View>
        </View>
    )
}
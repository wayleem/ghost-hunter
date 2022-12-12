import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
export default function Start({ startCamera }: any) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={startCamera}
                style={{
                    width: 130,
                    borderRadius: 4,
                    backgroundColor: '#14274e',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Take picture
                </Text>
            </TouchableOpacity>
        </View>
    )
}
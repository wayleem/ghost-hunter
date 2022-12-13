import { ScrollView, View, Image, } from 'react-native'
import { useSelector } from 'react-redux'
import { cameraStatus } from '../types'

export default function PhotoCollection() {
    const collection = useSelector((state: cameraStatus) => state.collection)
    return (
        <View
            style={{
                backgroundColor: '#fff',
                flex: 1,
                width: '100%',
                height: '100%',
            }}
        >
            <ScrollView style={{
                marginHorizontal: 20,
            }}>
                {collection.map((image) => {
                    return (
                        <View key={image}>
                            <Image style={{
                                width: '100%',
                                aspectRatio: 1

                            }}
                                source={{ uri: image }} />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}
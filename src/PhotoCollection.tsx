import { ScrollView, Text, View, TouchableOpacity, ImageBackground, Image, FlatList, ListRenderItem } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setCollectionVisible } from '../actions'
import { cameraStatus } from '../types'

export default function PhotoCollection() {
    const collection = useSelector((state: cameraStatus) => state.collection)
    /*const Item = ({ data }: { data: any }) => (
        <View
            style={{
                borderRadius: 10,
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}>
            <Image source={{ uri: data && data.uri }} />
        </View>
    )
    const renderItem: ListRenderItem<any> = ({ item }) => <Item data={item.uri} />
    return (
        <View
            style={{
                backgroundColor: '#fff',
                flex: 1,
                width: '100%',
                height: '100%',
            }}
        >
            <FlatList
                data={collection}
                renderItem={renderItem}
                keyExtractor={(item, index) => { return index.toString() }}
            />
        </View>
    )
}*/
    console.log("photocollection: " + collection)
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
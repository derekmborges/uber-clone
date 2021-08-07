import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: '1',
        title: 'UberX',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn'
    },
    {
        id: '2',
        title: 'Uber XL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8'
    },
    {
        id: '3',
        title: 'Uber LUX',
        multiplier: 1.75,
        image: 'https://links.papareact.com/7pf'
    },
]

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>    
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row items-center justify-between px-10
                                ${item.id === selected?.id && "bg-gray-200"}`}>
                        <Image
                            style={{ width: 100, height: 100, resizeMode: 'contain' }}
                            source={{ uri: item.image }}
                        />
                        <View style={tw`-ml-6 `}>
                            <Text style={tw`font-semibold text-xl`}>{item.title}</Text>
                            <Text style={tw`text-gray-500`}>Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>$99</Text>
                    </TouchableOpacity>
                )}
            />

            <View>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})

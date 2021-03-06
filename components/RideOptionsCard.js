import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'

import { selectTravelTimeInfo } from '../slices/navSlice'

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

// If there is SURGE pricing, this increases
const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const travelTimeInfo = useSelector(selectTravelTimeInfo)

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>    
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride - { travelTimeInfo?.distance?.text }
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(option) => option.id}
                renderItem={({item: option}) => (
                    <TouchableOpacity
                        onPress={() => setSelected(option)}
                        style={tw`flex-row items-center justify-between px-10
                                ${option.id === selected?.id && "bg-gray-200"}`}>
                        <Image
                            style={{ width: 100, height: 100, resizeMode: 'contain' }}
                            source={{ uri: option.image }}
                        />
                        <View style={tw`-ml-6 `}>
                            <Text style={tw`font-semibold text-xl`}>{option.title}</Text>
                            <Text style={tw`text-gray-500`}>{travelTimeInfo?.duration?.text} Travel Time</Text>
                        </View>
                        <NumberFormat
                            value={(travelTimeInfo?.duration?.value * SURGE_CHARGE_RATE * option.multiplier) / 100}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            prefix={'$'}
                            renderText={(value) => <Text style={tw`text-xl`}>{value}</Text>}
                        />
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
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

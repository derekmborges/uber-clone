import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core'

import { selectDestination, setDestination } from '../slices/navSlice'
import NavFavorites from './NavFavorites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const destination = useSelector(selectDestination)

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Derek</Text>

            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={destinationInputStyles}
                        enablePoweredByContainer={false}
                        minLength={2}
                        placeholder='Where to?'
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en'
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        fetchDetails={true}
                        onPress={(data, details) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }))

                            navigation.navigate('RideOptionsCard')
                        }}
                        returnKeyType={'search'}
                    />
                </View>

                <NavFavorites side='destination' />
            </View>

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    onPress={() => {
                        if (destination)
                            navigation.navigate('RideOptionsCard')
                        else
                            alert('Select destination first')
                    }}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name='car' type='font-awesome' color='white' size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
                    <Text style={tw`text-black text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default NavigateCard

const destinationInputStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'white',
        paddingTop: 20
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})

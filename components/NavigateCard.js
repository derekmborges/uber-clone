import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/core'

import { setDestination } from '../slices/navSlice'

const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

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

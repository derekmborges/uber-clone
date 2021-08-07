import React from 'react'
import { StyleSheet, View, SafeAreaView, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'

const HomeScreen = () => {
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                    source={{
                        uri: 'https://links.papareact.com/gzs'
                    }}
                />

                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                    enablePoweredByContainer={false}
                    minLength={2}
                    placeholder='Where from?'
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    fetchDetails={true}
                    onPress={(data, details) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestination(null))
                    }}
                    returnKeyType={'search'}
                />

                <NavOptions />
                {/* <NavFavorites /> */}
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }
})

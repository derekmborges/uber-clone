import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setOrigin, setDestination } from '../slices/navSlice'

const data = [
    {
        id: '1',
        icon: 'home',
        title: 'Home',
        location: 'Code Street, London, UK'
    },
    {
        id: '2',
        icon: 'briefcase',
        title: 'Work',
        location: 'London Eye, London, UK'
    },
]

const NavFavorites = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, {height: 0.5}]} />
            )}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => {
                        fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=geometry&input=${encodeURIComponent(item.location)}&inputtype=textquery&key=${GOOGLE_MAPS_APIKEY}`)
                            .then((res) => res.json())
                            .then(data => {
                                console.log(data)
                                if (data?.status && data?.status === 'OK') {
                                    // Set origin or destination respectively
                                    if (props.side === 'origin') {
                                        dispatch(setOrigin({
                                                location: data.candidates[0].geometry?.location,
                                                description: item.location
                                            }))
                                        dispatch(setDestination(null))
                                        navigation.navigate('MapScreen')
                                    } else if (props.side === 'destination') {
                                        dispatch(setDestination({
                                            location: data.candidates[0].geometry?.location,
                                                description: item.location
                                        }))
                                        navigation.navigate('RideOptionsCard')
                                    }

                                    
                                }
                            }).catch(error => {
                                console.log('error retrieving favorite place:', error)
                            })
                    }}
                    style={tw`flex-row items-center p-5`}>
                    <Icon 
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={item.icon}
                        type='ionicon'
                        color='white'
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{item.title}</Text>
                        <Text style={tw`text-gray-500`}>{item.location}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavorites

const styles = StyleSheet.create({})

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Heatmap, Polygon, PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { coordinatesGama } from './coordinates'
import LoggedInModal from '../../components/LoggedInModal'
import { useNavigation } from '@react-navigation/native'

const HeatMap = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView 
                loadingEnabled={true}
                initialRegion={{
                    latitude: -15.9897883,
                    longitude: -48.0464073,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0031,
                }}
                style={{ flex: 1 }}
            >
                <Marker
                    coordinate={{
                        latitude: -48.005184173584,
                        longitude: -15.9778680801392
                    }}
                />
                <Polygon
                    coordinates={coordinatesGama}
                    strokeColor='rgba(0.1, 0.2, 0.3, 0.5)'
                    fillColor='rgba(255, 0, 0, 0.4)'

                    
                />
            </MapView>

            <LoggedInModal navObject={navigation} />
        </SafeAreaView>    
    )
}

export default HeatMap;


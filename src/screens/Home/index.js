import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView from 'react-native-maps'

import LoggedInModal from '../../components/LoggedInModal'

export default Home = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                initialRegion={{
                    latitude: -15.9897883,
                    longitude: -48.0464073,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0031,
                }}
                style={styles.MapView}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: -15.9897883,
                        longitude: -48.0464073
                    }}
                />
            </MapView>

            <LoggedInModal navObject={navigation} />
        </SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    MapView: {
        flex: 1,
        width: "100%"
    }
})
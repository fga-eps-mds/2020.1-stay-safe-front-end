import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

export default Home = () => {
    return (
        <View style={{ flex: 1 }}>
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
        </View>    
    )
}

const styles = StyleSheet.create({
    MapView: {
        flex: 1,
        width: "100%",
        padding: 32
    }
})
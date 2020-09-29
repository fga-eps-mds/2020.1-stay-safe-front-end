import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps'

import LoggedInModal from '../../components/LoggedInModal'

export default Home = ({ navigation }) => {
    points = [
        { latitude: -15.9897883, longitude: -48.0464073, weight: 1 }
    ];
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
                <Heatmap
                    points={this.points}
                    radius={40}
                    opacity={1}
                    gradient={{
                      colors: ["black", "purple", "red", "orange", "white"],
                      startPoints: Platform.OS === 'ios' ? [0.01, 0.04, 0.1, 0.45, 0.5] :
                        [0.1, 0.25, 0.5, 0.75, 1],
                      colorMapSize: 2000
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
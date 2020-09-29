import React, { useState } from 'react'
import { useFocusEffect, useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { View, StyleSheet } from 'react-native'

import MapView, { Marker } from 'react-native-maps'


type ParamList = {
    params: {
        showReportModal: boolean;  
    }
}


const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const route = useRoute<RouteProp<ParamList, 'params'>>()

    useFocusEffect(() => {
        if(route.params) {
            setIsModalOpen(route.params.showReportModal)
            console.log(route.params)
        }
    });

    // Function to use on modal closed.
    const handleClosedModal = () => {
        setIsModalOpen(false)
        route.params = undefined
    }

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
                <Marker
                    coordinate={{
                        latitude: -15.9897883,
                        longitude: -48.0464073
                    }}
                />
            </MapView>
        </View>    
    )
}

export default Home;

const styles = StyleSheet.create({
    MapView: {
        flex: 1,
        width: "100%",
        padding: 32
    }
})
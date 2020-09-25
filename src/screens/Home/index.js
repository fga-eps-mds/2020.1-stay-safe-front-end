import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import AwesomeAlert from 'react-native-awesome-alerts'
import AsyncStorage from '@react-native-community/async-storage'

export default Home = ({navigation}) => {
    const [showAlert, changeAlert] = useState(true)

    const verifyUserLoggedIn = async() => {
        const userToken = await AsyncStorage.getItem('userToken')

        if (!userToken) {
            changeAlert(true)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <AwesomeAlert
                show={showAlert}
                title="Você não está logado."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Fazer login"
                confirmButtonColor="#E83338"
                showCancelButton={true}
                cancelText="Fechar"
                cancelButtonColor="#7DBFE2"
                onCancelPressed={() => {
                    changeAlert(false);
                }}
                onConfirmPressed={() => {
                    navigation.navigate('Login')
                    changeAlert(false)
                }}
            />

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
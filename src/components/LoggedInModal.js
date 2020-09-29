import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import StayAlert from './StayAlert'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

export default LoggedInModal = (props) => {
    const [showAlert, changeAlert] = useState(false)
    const { navObject, show } = props

    const [loaded] = Font.useFonts({
        'Trueno-SemiBold': require('../fonts/TruenoSBd.otf'),
        'Trueno-Regular': require('../fonts/TruenoRg.otf'),
    })

    const verifyUserLoggedIn = async () => {
        const userToken = await AsyncStorage.getItem('userToken')

        if (!userToken || show) {
            changeAlert(true)
        }
    }

    useFocusEffect(() => {
        verifyUserLoggedIn()
    }, [])

    if (!loaded) return null

    return (
        <StayAlert
            show={showAlert}
            title="Você não está logado"
            message="Faça login para poder utilizar todas as funcionalidades do app."
            showConfirmButton={true}
            confirmText="Fazer login"
            onConfirmPressed={() => {
                changeAlert(false)
                navObject.navigate('Login')
            }}
            showCancelButton={true}
            cancelText="Fechar"
            onCancelPressed={() => {
                changeAlert(false)
            }}
        />
    )
}
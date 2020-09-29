import React, { useState, useRef } from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import AsyncStorage from '@react-native-community/async-storage'

import Logo from '../../img/logo.svg'
import { scale } from '../../utils/scalling'
import { Container, KeyboardScrollView, LogoWrapper, Title } from '../../components/NormalForms'
import { NormalLabel, NormalInput, NormalSend, NormalCreate, SendLabel } from '../../components/NormalForms'

import { authUser } from '../../services/users'

export default Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [userPwd, setUserPwd] = useState('')

    const [loaded] = Font.useFonts({
        'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
        'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
    })

    const passwordInput = useRef();

    const handleLogin = async () => {
        const response = await authUser({
            username: username,
            password: userPwd,
        })

        if (!response.body.error && response.status === 200) {
            AsyncStorage.setItem("userToken", response.body.token)
            AsyncStorage.setItem("username", username);
            navigation.navigate('Home');
        } else {
            Alert.alert("Erro ao logar usuário", response.body.error)
        }
    }

    if (!loaded) return null

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <KeyboardScrollView>
                    <LogoWrapper>
                        <Logo width={scale(52)} height={scale(52)} />
                    </LogoWrapper>

                    <Title>Entrar</Title>

                    <NormalLabel>Username</NormalLabel>
                    <NormalInput
                        returnKeyType='next'
                        maxLength={20}
                        onChangeText={(text) => setUsername(text)}
                        onSubmitEditing={() => passwordInput.current.focus()}
                    />

                    <NormalLabel>Senha</NormalLabel>
                    <NormalInput
                        ref={passwordInput}
                        returnKeyType='next'
                        secureTextEntry={true}
                        maxLength={20}
                        onChangeText={(text) => setUserPwd(text)}
                        onSubmitEditing={() => handleLogin()}
                    />

                    <NormalSend onPress={() => handleLogin()}>
                        <SendLabel>Entrar</SendLabel>
                    </NormalSend>

                    <NormalCreate onPress={() => navigation.navigate('Cadastro')}>
                        <SendLabel>Criar conta</SendLabel>
                    </NormalCreate>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    )
}
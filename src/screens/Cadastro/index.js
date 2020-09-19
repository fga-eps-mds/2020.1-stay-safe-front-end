import React, { useState } from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import { Feather } from '@expo/vector-icons'

import Logo from '../../img/logo.svg'
import { scale } from '../../utils/scalling'
import { Container, KeyboardScrollView, BackScreen, LogoWrapper, Title } from '../../components/NormalForms'
import { NormalLabel, NormalInput, NormalSend, SendLabel } from '../../components/NormalForms'

import { createUser, authUser } from '../../services/users'
import { validateUser } from '../../utils/validateUser'

import AsyncStorage from '@react-native-community/async-storage'

export default Cadastro = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [userFullName, setUserFullName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPwd, setUserPwd] = useState("")
    const [userConfirmPwd, setUserConfirmPwd] = useState("")

    const [loaded] = Font.useFonts({
        'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
        'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
    })

    handleRegister = async () => {
        if (validateUser({
            fullName: userFullName,
            username: username,
            email: userEmail,
            password: userPwd,
            confirmPassword: userConfirmPwd
        })) {
            const response = await createUser({
                full_name: userFullName,
                username: username,
                email: userEmail,
                password: userPwd
            })
            if (!response.body.error && response.status === 201) {
                const response = await authUser({
                    username: username,
                    password: userPwd,
                })
                if (!response.body.error && response.status === 200) {
                    AsyncStorage.setItem("userToken", response.body.token)
                } else {
                    Alert.alert("Erro ao logar usuário", response.body.error)
                }
            } else {
                Alert.alert("Erro ao cadastrar usuário", response.body.error)
            }
        }
    }

    if (!loaded) return null
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <KeyboardScrollView>
                    <BackScreen onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={scale(28)} color="#010A26" />
                    </BackScreen>

                    <LogoWrapper>
                        <Logo width={scale(52)} height={scale(52)} />
                    </LogoWrapper>

                    <Title>Cadastro</Title>

                    <NormalLabel>Username</NormalLabel>
                    <NormalInput
                        returnKeyType='next'
                        maxLength={20}
                        onChangeText={(text) => setUsername(text)}
                        onSubmitEditing={() => fullNameInput.focus()}
                    />

                    <NormalLabel>Nome Completo</NormalLabel>
                    <NormalInput
                        ref={(input) => fullNameInput = input}
                        returnKeyType='next'
                        maxLength={200}
                        onChangeText={(text) => setUserFullName(text)}
                        onSubmitEditing={() => emailInput.focus()}
                    />

                    <NormalLabel>Email</NormalLabel>
                    <NormalInput
                        ref={(input) => emailInput = input}
                        returnKeyType='next'
                        keyboardType='email-address'
                        maxLength={50}
                        onChangeText={(text) => setUserEmail(text)}
                        onSubmitEditing={() => pwdInput.focus()}
                    />

                    <NormalLabel>Senha</NormalLabel>
                    <NormalInput
                        ref={(input) => pwdInput = input}
                        returnKeyType='next'
                        secureTextEntry={true}
                        maxLength={20}
                        onChangeText={(text) => setUserPwd(text)}
                        onSubmitEditing={() => confirmPwdInput.focus()}
                    />

                    <NormalLabel>Confirmar Senha</NormalLabel>
                    <NormalInput
                        ref={(input) => confirmPwdInput = input}
                        secureTextEntry={true}
                        maxLength={20}
                        onChangeText={(text) => setUserConfirmPwd(text)}
                        onSubmitEditing={() => handleRegister()}
                    />

                    <NormalSend onPress={() => handleRegister()}>
                        <SendLabel>Criar Conta</SendLabel>
                    </NormalSend>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    )
}
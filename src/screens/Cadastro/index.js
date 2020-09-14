import React from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'

import Logo from '../../img/logo.svg'
import { Container, KeyboardScrollView, LogoWrapper, Title } from '../../components/NormalForms'
import { NormalLabel, NormalInput, NormalSend, SendLabel } from '../../components/NormalForms'

import { createUser, authUser } from '../../services/users'
import { validateUser } from '../../utils/validateUser'

import AsyncStorage from '@react-native-community/async-storage'

class Cadastro extends React.Component {
    constructor() {
        super()
        this.state = {
            fontsLoaded: false,
            username: null,
            userFullName: null,
            userEmail: null,
            userPwd: null,
            userConfirmPwd: null
        }
    }

    componentDidMount() {
        this.loadFonts()
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
            'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
        });

        this.setState({ fontsLoaded: true })
    }

    handleRegister = async () => {
        if (validateUser({
            fullName: this.state.userFullName,
            username: this.state.username,
            email: this.state.userEmail,
            password: this.state.userPwd,
            confirmPassword: this.state.userConfirmPwd
        })) {
            const response = await createUser({
                full_name: this.state.userFullName,
                username: this.state.username,
                email: this.state.userEmail,
                password: this.state.userPwd
            })
            if (!response.body.error && response.status === 201) {
                const response = await authUser({
                    username: this.state.username,
                    password: this.state.userPwd,
                })
                if (!response.body.error && response.status === 200) {
                    AsyncStorage.setItem("userToken", response.body.token)
                    const a = await AsyncStorage.getItem("userToken")
                } else {
                    Alert.alert("Erro ao logar usuário", response.body.error)
                }
            } else {
                Alert.alert("Erro ao cadastrar usuário", response.body.error)
            }
        }
    }

    render() {
        if (!this.state.fontsLoaded) return null

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                    <KeyboardScrollView>
                        <LogoWrapper>
                            <Logo width={60} height={60} />
                        </LogoWrapper>

                        <Title>Cadastro</Title>

                        <NormalLabel>Username</NormalLabel>
                        <NormalInput
                            maxLength={20}
                            onChangeText={(text) => this.setState({ username: text })}
                        />

                        <NormalLabel>Nome Completo</NormalLabel>
                        <NormalInput
                            maxLength={200}
                            onChangeText={(text) => this.setState({ userFullName: text })}
                        />

                        <NormalLabel>Email</NormalLabel>
                        <NormalInput
                            keyboardType='email-address'
                            maxLength={50}
                            onChangeText={(text) => this.setState({ userEmail: text })}

                        />

                        <NormalLabel>Senha</NormalLabel>
                        <NormalInput
                            secureTextEntry={true}
                            maxLength={20}
                            onChangeText={(text) => this.setState({ userPwd: text })}
                        />

                        <NormalLabel>Confirmar Senha</NormalLabel>
                        <NormalInput
                            secureTextEntry={true}
                            maxLength={20}
                            onChangeText={(text) => this.setState({ userConfirmPwd: text })}
                            onSubmitEditing={() => this.handleRegister()}
                        />

                        <NormalSend onPress={() => this.handleRegister()}>
                            <SendLabel>Criar Conta</SendLabel>
                        </NormalSend>
                    </KeyboardScrollView>
                </Container>
            </SafeAreaView>
        )
    }
}

export default Cadastro
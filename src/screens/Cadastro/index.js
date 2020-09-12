import React from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'

import Logo from '../../img/logo.svg'
import { Container, KeyboardScrollView, LogoWrapper, Title } from '../../components/NormalForms'
import { NormalLabel, NormalInput, NormalSend, SendLabel } from '../../components/NormalForms'

class Cadastro extends React.Component {
    constructor() {
        super()
        this.state = {
            fontsLoaded: false,
            userName: null,
            userFullName: null,
            userEmail: null,
            userPwd: null
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

    isUserDataValid = () => {
        if (this.state.userName == null || this.state.userName == '') {
            Alert.alert("Campo não podem ficar em branco", "Username não pode ficar em branco")
        }
        if (this.state.userFullName == null || this.state.userFullName == '') {
            Alert.alert("Campo não podem ficar em branco", "Nome Completo não pode ficar em branco")
        }
        if (this.state.userEmail == null || this.state.userEmail == '') {
            Alert.alert("Campo não podem ficar em branco", "Email não pode ficar em branco")
        }
        if (this.state.userPwd == null || this.state.userPwd == '') {
            Alert.alert("Campo não podem ficar em branco", "Senha não pode ficar em branco")
        }
        if (this.state.userPwd.length < 6) {
            Alert.alert("Campo não podem ficar em branco", "Senha precisa de mínimo de 6 (seis) caracteres")
        }
        
    }

    render() {
        if (!this.state.fontsLoaded) return null

        return (
            <SafeAreaView style={{flex: 1}}>
                <Container>
                    <KeyboardScrollView>
                        <LogoWrapper>
                            <Logo width={60} height={60} />
                        </LogoWrapper>

                        <Title>Cadastro</Title>

                        <NormalLabel>Username</NormalLabel>
                        <NormalInput
                            maxLength={10}
                            onChangeText={(text) => this.setState({ userName: text })}
                        />

                        <NormalLabel>Nome Completo</NormalLabel>
                        <NormalInput
                            maxLength={100}
                            onChangeText={(text) => this.setState({ userFullName: text })}
                        />

                        <NormalLabel>Email</NormalLabel>
                        <NormalInput
                            keyboardType='email-address'
                            maxLength={10}
                            onChangeText={(text) => this.setState({ userEmail: text })}
                        />

                        <NormalLabel>Senha</NormalLabel>
                        <NormalInput
                            secureTextEntry={true}
                            maxLength={18}
                            onChangeText={(text) => this.setState({ userPwd: text })}
                            onSubmitEditing={() => this.isUserDataValid()}
                        />

                        <NormalSend onPress={() => this.isUserDataValid()}>
                            <SendLabel>Criar Conta</SendLabel>
                        </NormalSend>
                    </KeyboardScrollView>
                </Container>
            </SafeAreaView>
        )
    }
}

export default Cadastro
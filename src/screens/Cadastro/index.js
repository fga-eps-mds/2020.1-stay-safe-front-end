import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Keyboard } from 'react-native'
import * as Font from 'expo-font'

import RedStatusBar from '../../components/RedStatusBar'
import NormalLabel from '../../components/NormalLabel'
import NormalInput from '../../components/NormalInput'
import NormalSend from '../../components/NormalSend'
import { Container, KeyboardScrollView, Title } from './styles'

class Cadastro extends React.Component {
    constructor() {
        super()
        this.state = {
            fontsLoaded: false,
            userName: null
        }
    }

    loadFonts = async () => {
        await Font.loadAsync({
          'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
        });

        this.setState({ fontsLoaded: true })
    }

    componentDidMount() {
        this.loadFonts()
    }

    render() {
        if (!this.state.fontsLoaded) return null

        return (
            <>
                <SafeAreaView style={{flex: 0}} />
                <RedStatusBar />

                <Container>
                    <KeyboardScrollView>
                        <Title>Cadastro</Title>

                        <NormalLabel>Username</NormalLabel>
                        <NormalInput
                        />

                        <NormalLabel>Nome Completo</NormalLabel>
                        <NormalInput
                        />

                        <NormalLabel>Email</NormalLabel>
                        <NormalInput
                        />

                        <NormalLabel>Senha</NormalLabel>
                        <NormalInput
                        />
                        
                        <NormalSend />
                    </KeyboardScrollView>
                </Container>
            </>
        );
    }
}

export default Cadastro
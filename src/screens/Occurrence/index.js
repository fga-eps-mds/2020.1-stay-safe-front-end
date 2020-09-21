import React, { } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import { Feather } from '@expo/vector-icons'

import { scale } from '../../utils/scalling'
import { Container, KeyboardScrollView } from '../../components/NormalForms'
import { NormalSend, SendLabel } from '../../components/NormalForms'
import { Header, HeaderTitle, HeaderBackScreen } from '../../components/HeaderComponent'

export default Occurence = ({ navigation }) => {
    const [loaded] = Font.useFonts({
        'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
        'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
    })

    if (!loaded) return null

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <KeyboardScrollView>
                    <Header>
                        <HeaderBackScreen onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" size={scale(28)} color="#010A26" />
                        </HeaderBackScreen>
                        <HeaderTitle>Reportar Ocorrência</HeaderTitle>
                    </Header>

                    <NormalSend onPress={() => {}}>
                        <SendLabel>Enviar</SendLabel>
                    </NormalSend>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    )
}
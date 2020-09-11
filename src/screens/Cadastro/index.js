import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import RedStatusBar from '../../components/RedStatusBar'
import { Container, Hello } from './styles'

class Cadastro extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: null
        }
    }

    render() {
        return (
            <SafeAreaView>
                <RedStatusBar />

                <Container>
                    <Hello>Tela de cadastro</Hello>
                </Container>
            </SafeAreaView>
        );
    }
}

export default Cadastro
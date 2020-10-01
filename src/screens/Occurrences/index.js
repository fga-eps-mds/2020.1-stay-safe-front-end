import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getOccurrences } from '../../services/occurrences'
import AsyncStorage from '@react-native-community/async-storage'

import HeaderTitle from '../../components/HeaderTitle'
import { Container, Title } from '../../components/NormalForms'
import { CardContainer, Card } from './styles'

const Occurrences = () => {

    const [occurrences, setOccurrences] = useState([])

    const fetchData = async () => {
        const username = await AsyncStorage.getItem('username')
        const response = await getOccurrences(username)
        if (!response.body.errors && response.status == 200)
            setOccurrences(response.body)
        else
            console.warn("Falha ao carregar as ocorrências do usuário.")
    } 

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Minhas Ocorrências" />
                <CardContainer>
                    <Card>
                        {occurrences.map((occurrence) => {
                            return (
                                <Title key={occurrence.id_occurrence}>{occurrence.occurrence_type}</Title>
                                
                            );
                        })}
                    </Card>
                </CardContainer>
            </Container>
        </SafeAreaView>
    );
}

export default Occurrences;
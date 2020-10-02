import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-community/async-storage'
import { Feather } from '@expo/vector-icons'

import HeaderTitle from '../../components/HeaderTitle'
import { scale } from '../../utils/scalling'
import { Container } from '../../components/NormalForms'
import { CardContainer, Card, CardData, Title, Date, CardActions } from './styles'

import { getOccurrences } from '../../services/occurrences'

import data from './data.json'

const Occurrences = () => {
    const [occurrences, setOccurrences] = useState(data)

    const getFormattedDate = (date) => {
        let formattedDate = date.split(' ', 1).toString()
        formattedDate = formattedDate.split('-')
        return formattedDate[2] + '/' + formattedDate[1] + '/' + formattedDate[0]
    }

    const fetchData = async () => {
        const username = await AsyncStorage.getItem('username')
/*
        const response = await getOccurrences(username)

        if (!response.body.errors && response.status == 200)
            setOccurrences(response.body)
        else
            console.warn("Falha ao carregar as ocorrências do usuário.")
*/
    } 

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Minhas Ocorrências" />
                <CardContainer>
                    {occurrences.map((occurrence) => {
                        return (
                            <Card key={occurrence.id_occurrence}>
                                <CardData>
                                    <Title>{occurrence.occurrence_type}</Title>
                                    <Date>{getFormattedDate(occurrence.occurrence_date_time)}</Date>
                                </CardData>
                                
                                <CardActions>
                                    <Feather name="edit-3" size={scale(24)} color="#010A26" />
                                    <Feather name="trash-2" size={scale(24)} color="#010A26" />
                                </CardActions>
                            </Card>
                        )
                    })}
                </CardContainer>
            </Container>
        </SafeAreaView>
    )
}

export default Occurrences;
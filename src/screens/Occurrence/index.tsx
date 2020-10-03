import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { formatDateTime } from '../../utils/dates'
import { validateOccurrence } from '../../utils/validateOccurrence'
import { updateOccurrence, createOccurrence } from '../../services/occurrences'
import HeaderTitle from '../../components/HeaderTitle'
import {
    Container,
    KeyboardScrollView,
    NormalSend,
    SendLabel,
    NormalLabel,
} from '../../components/NormalForms'
import {
    DropDown,
    InputContainer,
    InputWrapper,
    TouchablePicker,
    PlaceholderPicker,
    DatePicker,
    TimePicker,
} from './styles'
import {
    occurrenceTypeItems,
    gunItems,
    physicalAggressionItems,
    policeReportItems,
    victimItems,
    dropdownStyle,
} from './dropdownConstants'

const Occurrence: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const [isEditing, setIsEditing] = useState(false)
    const [idOccurrence, setIdOccurrence] = useState(0)

    const [selectedOccurrenceType, setSelectedOccurrenceType] = useState('')
    const [selectedGun, setSelectedGun] = useState('')
    const [selectedVictim, setSelectedVictim] = useState(null)
    const [selectedPhysicalAggression, setSelectedPhysicalAggression] = useState(null)
    const [selectedPoliceReport, setSelectedPoliceReport] = useState(null)

    const [datetime, setDatetime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const currentDate = new Date()

    const [loaded] = Font.useFonts({
        'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
        'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            navigation.setParams({occurrence: null})
        });
    
        return unsubscribe;
    }, [navigation]);

    const fetchData = () => {
        if (!route.params || !route.params.occurrence) {
            setIsEditing(false)
            setIdOccurrence(null)
            setSelectedOccurrenceType(null)
            setSelectedVictim(null)
            setSelectedGun(null)
            setSelectedPhysicalAggression(null)
            setSelectedPoliceReport(null)
            setDatetime(new Date())
            return null
        }

        const occurrence = route.params.occurrence

        setIsEditing(true)
        setIdOccurrence(occurrence.id_occurrence)
        setSelectedOccurrenceType(occurrence.occurrence_type)
        setSelectedVictim(occurrence.victim)
        setSelectedGun(occurrence.gun)
        setSelectedPhysicalAggression(occurrence.physical_aggression)
        setSelectedPoliceReport(occurrence.police_report)
        const d = formatDateTime(occurrence.occurrence_date_time)
        setDatetime(d)
    }

    useEffect(() => {
        fetchData()
    }, [route])

    const onChangeOccurrenceDatetime = (event, selectedDate) => {
        setShowDatePicker(false)
        setShowTimePicker(false)
        const currentDate = selectedDate || datetime
        setDatetime(currentDate)
    }

    const formatDate = (date: Date) => {
        let day = ('0' + date.getDate()).slice(-2)
        let month = ('0' + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()

        let formatedDate = `${day}/${month}/${year}`

        return formatedDate
    }

    const formatTime = (date: Date) => {
        let hour = ('0' + date.getHours()).slice(-2)
        let minutes = ('0' + (date.getMinutes())).slice(-2)

        let formatedTime = `${hour}:${minutes}`

        return formatedTime
    }

    const formatDatetime = (datetime: Date) => {
        let date = datetime.toLocaleDateString().split('/')
        let time = datetime.toLocaleTimeString()

        let month = date[0]
        let day = date[1]
        let year = `20${date[2]}`

        let formatedDatetime = `${year}-${month}-${day} ${time}`

        return formatedDatetime
    }

    const handleSubmit = async () => {
        const data = {
            occurrence_type: selectedOccurrenceType,
            gun: selectedGun,
            victim: selectedVictim,
            physical_aggression: selectedPhysicalAggression,
            police_report: selectedPoliceReport,
            occurrence_date_time: formatDatetime(datetime),
            location: [
                -15.989558,
                -48.044206
            ]
        }
        if (validateOccurrence(data)) {
            const token = await AsyncStorage.getItem('userToken')
            const response = isEditing ? await updateOccurrence(idOccurrence, token, data) :
                                         await createOccurrence(data, token)

            if (!response.body.error && response.status === 201) {
                Alert.alert('Ocorrência cadastrada com sucesso!')
                navigation.setParams({occurrence: null})
                navigation.navigate('Home')
            } else if (!response.body.error && response.status === 200) {
                Alert.alert('Ocorrência atualizada com sucesso!')
                navigation.setParams({occurrence: null})
                navigation.navigate('Occurrences')
            } else {
                Alert.alert('Erro ao cadastrar ocorrência', response.body.error)
            }
        }
    }

    if (!loaded) return null

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={isEditing ? 'Editar Ocorrência' : 'Reportar Ocorrência'} goBack />
                <KeyboardScrollView>
                    <InputContainer style={{ width: '80%',  marginTop: 0 }}>
                        <NormalLabel>Tipo de Ocorrência</NormalLabel>
                        <DropDown
                            items={occurrenceTypeItems}
                            style={dropdownStyle}
                            defaultValue={selectedOccurrenceType}
                            onChangeItem={item => setSelectedOccurrenceType(item.value)}
                        />
                    </InputContainer>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Tipo de Arma</NormalLabel>
                            <DropDown
                                items={gunItems}
                                style={dropdownStyle}
                                defaultValue={selectedGun}
                                onChangeItem={item => setSelectedGun(item.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Vítima</NormalLabel>
                            <DropDown
                                items={victimItems}
                                style={dropdownStyle}
                                defaultValue={selectedVictim}
                                onChangeItem={item => setSelectedVictim(item.value)}
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Agressão Física</NormalLabel>
                            <DropDown
                                items={physicalAggressionItems}
                                style={dropdownStyle}
                                defaultValue={selectedPhysicalAggression}
                                onChangeItem={item => setSelectedPhysicalAggression(item.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Boletim de Ocorrência</NormalLabel>
                            <DropDown
                                items={policeReportItems}
                                style={dropdownStyle}
                                defaultValue={selectedPoliceReport}
                                onChangeItem={item => setSelectedPoliceReport(item.value)}
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Data da Ocorrência</NormalLabel>
                            <TouchablePicker onPress={() => setShowDatePicker(true)}>
                                <PlaceholderPicker>
                                    {formatDate(datetime)}
                                </PlaceholderPicker>
                            </TouchablePicker>
                            {showDatePicker && (
                                <DatePicker
                                    value={datetime}
                                    onChange={onChangeOccurrenceDatetime}
                                    maximumDate={currentDate}
                                    minimumDate={new Date(
                                        currentDate.getFullYear() - 1,
                                        currentDate.getMonth(),
                                        currentDate.getDate())
                                    }
                                />
                            )}
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Hora da Ocorrência</NormalLabel>
                            <TouchablePicker onPress={() => setShowTimePicker(true)}>
                                <PlaceholderPicker>
                                    {formatTime(datetime)}
                                </PlaceholderPicker>
                            </TouchablePicker>
                            {showTimePicker && (
                                <TimePicker
                                    value={datetime}
                                    onChange={onChangeOccurrenceDatetime}
                                />
                            )}
                        </InputContainer>
                    </InputWrapper>

                    <NormalSend
                        style={{ marginTop: 45 }}
                        onPress={handleSubmit}
                    >
                        <SendLabel>{isEditing ? 'Editar Ocorrência' : 'Registrar Ocorrência'}</SendLabel>
                    </NormalSend>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    )
}

export default Occurrence
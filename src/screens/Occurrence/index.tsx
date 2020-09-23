import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'

import { scale } from '../../utils/scalling'
import {
    Header,
    HeaderTitle,
    HeaderBackScreen
} from '../../components/HeaderComponent'
import {
    Container,
    KeyboardScrollView,
    NormalSend,
    SendLabel,
    NormalLabel,
} from '../../components/NormalForms'
import {
    InputContainer,
    InputWrapper,
    TouchablePicker,
    PlaceholderPicker,
    DatePicker,
    TimePicker
} from './styles'
import {
    occurrence_type,
    gun,
    physicalAggression,
    policeReport,
    victim,
} from './dropdownItems'

const Occurrence: React.FC = () => {
    const navigation = useNavigation()

    const [selectedOccurrence, setSelectedOccurence] = useState("");
    const [selectedGun, setSelectedGun] = useState("");
    const [selectedVictim, setSelectedVictim] = useState(null);
    const [selectedPhysicalAggression, setSelectedPhysicalAggression] = useState(null);
    const [selectedPoliceReport, setSelectedPoliceReport] = useState(null);

    const [datetime, setDatetime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const currentDate = new Date();

    const [loaded] = Font.useFonts({
        'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
        'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
    })

    if (!loaded) return null

    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        const currentDate = selectedDate || datetime;
        setDatetime(currentDate);
    };

    const formatDate = (date: Date) => {
        let day = ("0" + date.getDate()).slice(-2)
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()

        let formatedDate = `${day}/${month}/${year}`

        return formatedDate
    }

    const formatTime = (date: Date) => {
        let hour = ("0" + date.getHours()).slice(-2)
        let minutes = ("0" + (date.getMinutes())).slice(-2)

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

                    <InputContainer style={{ width: '80%' }}>
                        <NormalLabel>Tipo de Ocorrência</NormalLabel>
                        <DropDownPicker
                            items={occurrence_type}
                            placeholder="Selecionar"
                            containerStyle={{ height: 42, width: 300 }}
                            style={{
                                backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15
                            }}
                            itemStyle={{
                                justifyContent: 'center',
                            }}
                            dropDownStyle={{
                                backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15
                            }}
                            onChangeItem={item => setSelectedOccurence(item.value)}
                        />
                    </InputContainer>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Tipo de Arma</NormalLabel>
                            <DropDownPicker
                                items={gun}
                                placeholder="Selecionar"
                                containerStyle={{ height: 42 }}
                                style={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}
                                onChangeItem={item => setSelectedGun(item.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Vítima</NormalLabel>
                            <DropDownPicker
                                items={victim}
                                placeholder="Selecionar"
                                containerStyle={{ height: 42 }}
                                style={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}
                                onChangeItem={item => setSelectedVictim(item.value)}
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Agressão Física</NormalLabel>
                            <DropDownPicker
                                items={physicalAggression}
                                placeholder="Selecionar"
                                containerStyle={{ height: 42 }}
                                style={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}
                                onChangeItem={item => setSelectedPhysicalAggression(item.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Boletim de Ocorrência</NormalLabel>
                            <DropDownPicker
                                items={policeReport}
                                placeholder="Selecionar"
                                containerStyle={{ height: 42 }}
                                style={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{
                                    backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}
                                onChangeItem={item => setSelectedPoliceReport(item.value)}
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Data da Ocorrência</NormalLabel>
                            <TouchablePicker onPress={() => setShowDatePicker(true)}>
                                <PlaceholderPicker>{formatDate(datetime)}</PlaceholderPicker>
                            </TouchablePicker>
                            {showDatePicker && (
                                <DatePicker
                                    value={datetime}
                                    onChange={onChange}
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
                                <PlaceholderPicker>{formatTime(datetime)}</PlaceholderPicker>
                            </TouchablePicker>
                            {showTimePicker && (
                                <TimePicker
                                    value={datetime}
                                    onChange={onChange}
                                />
                            )}
                        </InputContainer>
                    </InputWrapper>

                    <NormalSend style={{ marginTop: 45 }} onPress={() => {
                        console.log(selectedOccurrence)
                        console.log(selectedGun)
                        console.log(selectedVictim)
                        console.log(selectedPhysicalAggression)
                        console.log(selectedPoliceReport)
                        console.log(formatDatetime(datetime))
                    }}>
                        <SendLabel>Enviar</SendLabel>
                    </NormalSend>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    )
}

export default Occurrence
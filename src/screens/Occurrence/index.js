import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import { Feather } from '@expo/vector-icons'

import { scale } from '../../utils/scalling'
import { Container, KeyboardScrollView } from '../../components/NormalForms'
import { NormalSend, SendLabel, NormalLabel, NormalSelect, SelectWrapper } from '../../components/NormalForms'
import { Header, HeaderTitle, HeaderBackScreen } from '../../components/HeaderComponent'
import DropDownPicker from 'react-native-dropdown-picker'

export default Occurence = ({ navigation }) => {
    const occurrences = [
        {label: "Latrocínio", value: "Latrocínio"},
        {label: "Roubo a Traseunte", value: "Roubo a Traseunte"},
        {label: "Roubo de Veículo", value: "Roubo de Veículo"},
        {label: "Roubo de Residência", value: "Roubo de Residência"},
        {label: "Estupro", value: "Estupro"},
    ]

    const gun = [
        {label: "Nenhuma", value: "None"},
        {label: "Arma de Fogo", value: "Fire"},
        {label: "Arma Branca", value: "White"},
    ]

    const victim = [
        {label: "Vítima", value: true},
        {label: "Testemunha", value: false},
    ]

    const physicalAggression = [
        {label: "Sim", value: true},
        {label: "Não", value: false},
    ]

    const policeReport = [
        {label: "Sim", value: true},
        {label: "Não", value: false},
    ]

    const [selectedOccurrence, setSelectedOccurence] = useState("");
    const [selectedGun, setSelectedGun] = useState("");
    const [selectedVictim, setSelectedVictim] = useState(null);
    const [selectedPhysicalAggression, setSelectedPhysicalAggression] = useState(null);
    const [selectedPoliceReport, setSelectedPoliceReport] = useState(null);

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

                    <NormalLabel style={{marginTop: 20}}>Tipo de Ocorrência</NormalLabel>
                    <DropDownPicker
                        items={occurrences}
                        placeholder="Selecionar"
                        containerStyle={{height: 42, width: 300}}
                        style={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                            borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15}}
                        itemStyle={{
                            justifyContent: 'center',
                        }}
                        dropDownStyle={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                            borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15}}
                        onChangeItem={item => setSelectedOccurence(item.value)}
                    />

                    <SelectWrapper>
                        <NormalSelect>
                            <NormalLabel style={{marginTop: 20}}>Tipo de Arma</NormalLabel>
                            <DropDownPicker
                                items={gun}
                                placeholder="Selecionar"
                                containerStyle={{height: 42}}
                                style={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                onChangeItem={item => setSelectedGun(item.value)}
                            />
                        </NormalSelect>
                        
                        <NormalSelect>
                            <NormalLabel style={{marginTop: 20}}>Vítima</NormalLabel>
                            <DropDownPicker
                                items={victim}
                                placeholder="Selecionar"
                                containerStyle={{height: 42}}
                                style={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                onChangeItem={item => setSelectedVictim(item.value)}
                            />
                        </NormalSelect>
                    </SelectWrapper>


                    <SelectWrapper>
                        <NormalSelect>
                            <NormalLabel style={{marginTop: 20}}>Agressão Física</NormalLabel>
                            <DropDownPicker
                                items={physicalAggression}
                                placeholder="Selecionar"
                                containerStyle={{ height: 42}}
                                style={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                onChangeItem={item => setSelectedPhysicalAggression(item.value)}
                            />
                        </NormalSelect>
                        
                        <NormalSelect>
                            <NormalLabel style={{marginTop: 20}}>Boletim de Ocorrência</NormalLabel>
                            <DropDownPicker
                                items={policeReport}
                                placeholder="Selecionar"
                                containerStyle={{height: 42}}
                                style={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                itemStyle={{
                                    justifyContent: 'center',
                                }}
                                dropDownStyle={{backgroundColor: '#ffffff', borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15}}
                                onChangeItem={item => setSelectedPoliceReport(item.value)}
                            />
                        </NormalSelect>
                    </SelectWrapper>
                    
                    <NormalSend onPress={() => {
                        console.log(selectedOccurrence)
                        console.log(selectedGun)
                        console.log(selectedVictim)
                        console.log(selectedPhysicalAggression)
                        console.log(selectedPoliceReport)
                    }}>
                        <SendLabel>Enviar</SendLabel>
                    </NormalSend>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    )
}
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTitle from "../../components/HeaderTitle";
import {
    Container,
    KeyboardScrollView,
    NormalSend,
    SendLabel,
    NormalLabel,
} from "../../components/NormalForms";
import { createOccurrence } from "../../services/occurrences";
import { validateOccurrence } from "../../utils/validateOccurrence";
import {
    occurrenceTypeItems,
    gunItems,
    physicalAggressionItems,
    policeReportItems,
    victimItems,
    dropdownStyle,
} from "./dropdownConstants";
import {
    DropDown,
    InputContainer,
    InputWrapper,
    TouchablePicker,
    PlaceholderPicker,
    DatePicker,
    TimePicker,
} from "./styles";

const Occurrence: React.FC = () => {
    const navigation = useNavigation();

    const [selectedOccurrenceType, setSelectedOccurenceType] = useState("");
    const [selectedGun, setSelectedGun] = useState("");
    const [selectedVictim, setSelectedVictim] = useState(null);
    const [
        selectedPhysicalAggression,
        setSelectedPhysicalAggression,
    ] = useState(null);
    const [selectedPoliceReport, setSelectedPoliceReport] = useState(null);

    const [datetime, setDatetime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const currentDate = new Date();

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const onChangeOccurrenceDatetime = (event, selectedDate) => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        const currentDate = selectedDate || datetime;
        setDatetime(currentDate);
    };

    const formatDate = (date: Date) => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        const formatedDate = `${day}/${month}/${year}`;

        return formatedDate;
    };

    const formatTime = (date: Date) => {
        const hour = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);

        const formatedTime = `${hour}:${minutes}`;

        return formatedTime;
    };

    const formatDatetime = (datetime: Date) => {
        const date = datetime.toLocaleDateString().split("/");
        const time = datetime.toLocaleTimeString();

        const month = date[0];
        const day = date[1];
        const year = `20${date[2]}`;

        const formatedDatetime = `${year}-${month}-${day} ${time}`;

        return formatedDatetime;
    };

    const handleRegisterOccurrence = async () => {
        if (
            validateOccurrence({
                occurrenceType: selectedOccurrenceType,
                gun: selectedGun,
                victim: selectedVictim,
                physicalAggression: selectedPhysicalAggression,
                policeReport: selectedPoliceReport,
                occurrenceDateTime: datetime,
            })
        ) {
            const token = await AsyncStorage.getItem("userToken");
            const response = await createOccurrence(
                {
                    gun: selectedGun,
                    location: [-15.989564, -48.044175],
                    occurrence_date_time: formatDatetime(datetime),
                    occurrence_type: selectedOccurrenceType,
                    physical_aggression: selectedPhysicalAggression,
                    police_report: selectedPoliceReport,
                    victim: selectedVictim,
                },
                token
            );

            if (!response.body.error && response.status === 201) {
                Alert.alert("Ocorrência cadastrada com sucesso!");
                navigation.navigate("Home");
            } else {
                Alert.alert(
                    "Erro ao cadastrar ocorrência",
                    response.body.error
                );
            }
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Reportar Ocorrência" goBack />
                <KeyboardScrollView>
                    <InputContainer style={{ width: "80%", marginTop: 0 }}>
                        <NormalLabel>Tipo de Ocorrência</NormalLabel>
                        <DropDown
                            items={occurrenceTypeItems}
                            style={dropdownStyle}
                            onChangeItem={(item) =>
                                setSelectedOccurenceType(item.value)
                            }
                        />
                    </InputContainer>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Tipo de Arma</NormalLabel>
                            <DropDown
                                items={gunItems}
                                style={dropdownStyle}
                                onChangeItem={(item) =>
                                    setSelectedGun(item.value)
                                }
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Vítima</NormalLabel>
                            <DropDown
                                items={victimItems}
                                style={dropdownStyle}
                                onChangeItem={(item) =>
                                    setSelectedVictim(item.value)
                                }
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Agressão Física</NormalLabel>
                            <DropDown
                                items={physicalAggressionItems}
                                style={dropdownStyle}
                                onChangeItem={(item) =>
                                    setSelectedPhysicalAggression(item.value)
                                }
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Boletim de Ocorrência</NormalLabel>
                            <DropDown
                                items={policeReportItems}
                                style={dropdownStyle}
                                onChangeItem={(item) =>
                                    setSelectedPoliceReport(item.value)
                                }
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Data da Ocorrência</NormalLabel>
                            <TouchablePicker
                                onPress={() => setShowDatePicker(true)}
                            >
                                <PlaceholderPicker>
                                    {formatDate(datetime)}
                                </PlaceholderPicker>
                            </TouchablePicker>
                            {showDatePicker && (
                                <DatePicker
                                    value={datetime}
                                    onChange={onChangeOccurrenceDatetime}
                                    maximumDate={currentDate}
                                    minimumDate={
                                        new Date(
                                            currentDate.getFullYear() - 1,
                                            currentDate.getMonth(),
                                            currentDate.getDate()
                                        )
                                    }
                                />
                            )}
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Hora da Ocorrência</NormalLabel>
                            <TouchablePicker
                                onPress={() => setShowTimePicker(true)}
                            >
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
                        onPress={handleRegisterOccurrence}
                    >
                        <SendLabel>Registrar Ocorrência</SendLabel>
                    </NormalSend>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Occurrence;

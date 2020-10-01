import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import { validateOccurrence } from "../../utils/validateOccurrence";
import { createOccurrence } from "../../services/occurrences";
import HeaderTitle from "../../components/HeaderTitle";
import {
    Container,
    KeyboardScrollView,
    NormalSend,
    SendLabel,
    NormalLabel,
} from "../../components/NormalForms";
import {
    DropDown,
    InputContainer,
    InputWrapper,
    TouchablePicker,
    PlaceholderPicker,
    DatePicker,
    TimePicker,
} from "./styles";
import {
    occurrenceTypeItems,
    gunItems,
    physicalAggressionItems,
    policeReportItems,
    victimItems,
    dropdownStyle,
} from "./dropdownConstants";

type ParamList = {
    params: {
        latitude: number;
        longitude: number;
    };
};

const Occurrence: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, "params">>();

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

    const { latitude, longitude } = route.params;

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
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();

        let formatedDate = `${day}/${month}/${year}`;

        return formatedDate;
    };

    const formatTime = (date: Date) => {
        let hour = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);

        let formatedTime = `${hour}:${minutes}`;

        return formatedTime;
    };

    const formatDatetime = (datetime: Date) => {
        let date = datetime.toLocaleDateString().split("/");
        let time = datetime.toLocaleTimeString();

        let month = date[0];
        let day = date[1];
        let year = `20${date[2]}`;

        let formatedDatetime = `${year}-${month}-${day} ${time}`;

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
                    location: [latitude, longitude],
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

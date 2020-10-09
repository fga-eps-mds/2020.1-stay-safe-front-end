import AsyncStorage from "@react-native-community/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
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
import StayAlert from "../../components/StayAlert";
import { updateOccurrence, createOccurrence } from "../../services/occurrences";
import { formatDateTime } from "../../utils/dates";
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

type ParamList = {
    params: {
        latitude: number;
        longitude: number;
    };
};

const Occurrence: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, "params">>();

    const [isEditing, setIsEditing] = useState(false);
    const [idOccurrence, setIdOccurrence] = useState(0);

    const [selectedOccurrenceType, setSelectedOccurrenceType] = useState("");
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

    const [availableVictimOptions, setAvailableVictimOptions] = useState(
        victimItems
    );
    const [
        availablePhysicalAgressionOptions,
        setAvailablePhysicalAgression,
    ] = useState(physicalAggressionItems);
    const [
        availablePoliceReportOptions,
        setAvailablePoliceReportOptions,
    ] = useState(policeReportItems);

    const [showSuccessfullyModal, setShowSuccessfullyModal] = useState(false);

    const currentDate = new Date();

    const { latitude, longitude } = route.params;

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", () => {
            navigation.setParams({ occurrence: null });
        });

        return unsubscribe;
    }, [navigation]);

    const fetchData = (reset = false) => {
        if (!route.params || !route.params.occurrence) {
            setIdOccurrence(0);
            setSelectedOccurrenceType("");
            setSelectedVictim(null);
            setSelectedGun("");
            setSelectedPhysicalAggression(null);
            setSelectedPoliceReport(null);
            setDatetime(new Date());
            return null;
        }

        const occurrence = route.params.occurrence;

        setIsEditing(true);
        setIdOccurrence(occurrence.id_occurrence);
        setSelectedOccurrenceType(occurrence.occurrence_type);
        setSelectedVictim(occurrence.victim);
        setSelectedGun(occurrence.gun);
        setSelectedPhysicalAggression(occurrence.physical_aggression);
        setSelectedPoliceReport(occurrence.police_report);
        const d = formatDateTime(occurrence.occurrence_date_time);
        setDatetime(d);
        setAvailableVictimOptions(
            victimItems.map((victimItem) => {
                if (occurrence.victim || victimItem.label === "Vítima")
                    return victimItem;
                return {
                    label: victimItem.label,
                    value: victimItem.value,
                    selected: true,
                };
            })
        );
        setAvailablePhysicalAgression(
            physicalAggressionItems.map((physicalAgressionItem) => {
                if (
                    occurrence.physical_aggression ||
                    physicalAgressionItem.label === "Sim"
                )
                    return physicalAgressionItem;
                return {
                    label: physicalAgressionItem.label,
                    value: physicalAgressionItem.value,
                    selected: true,
                };
            })
        );
        setAvailablePoliceReportOptions(
            policeReportItems.map((policeReportItem) => {
                if (
                    occurrence.police_report ||
                    policeReportItem.label === "Sim"
                )
                    return policeReportItem;
                return {
                    label: policeReportItem.label,
                    value: policeReportItem.value,
                    selected: true,
                };
            })
        );
    };

    useEffect(() => {
        fetchData();
    }, [route]);

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

    const handleSubmit = async () => {
        const data = {
            occurrence_type: selectedOccurrenceType,
            gun: selectedGun,
            victim: selectedVictim,
            physical_aggression: selectedPhysicalAggression,
            police_report: selectedPoliceReport,
            occurrence_date_time: formatDatetime(datetime),
            location: [latitude, longitude],
        };
        if (validateOccurrence(data)) {
            const token = await AsyncStorage.getItem("userToken");
            const response = isEditing
                ? await updateOccurrence(idOccurrence, token, data)
                : await createOccurrence(data, token);

            if (!response.body.error && response.status === 201) {
                navigation.setParams({ occurrence: null });
                setShowSuccessfullyModal(true);
            } else if (!response.body.error && response.status === 200) {
                navigation.setParams({ occurrence: null });
                setShowSuccessfullyModal(true);
            } else {
                Alert.alert(
                    "Erro ao cadastrar ocorrência",
                    response.body.error
                );
            }
        }
    };

    const handleClosedModal = () => {
        setShowSuccessfullyModal(false);

        if (isEditing) {
            navigation.navigate("Occurrences");
        } else {
            navigation.navigate("Home");
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle
                    text={
                        isEditing ? "Editar Ocorrência" : "Reportar Ocorrência"
                    }
                    goBack
                />
                <KeyboardScrollView>
                    <InputContainer style={{ width: "80%", marginTop: 0 }}>
                        <NormalLabel>Tipo de Ocorrência</NormalLabel>
                        <DropDown
                            items={occurrenceTypeItems}
                            style={dropdownStyle}
                            defaultValue={
                                selectedOccurrenceType
                                    ? selectedOccurrenceType
                                    : null
                            }
                            onChangeItem={(item) =>
                                setSelectedOccurrenceType(item.value)
                            }
                        />
                    </InputContainer>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Tipo de Arma</NormalLabel>
                            <DropDown
                                items={gunItems}
                                style={dropdownStyle}
                                defaultValue={selectedGun ? selectedGun : null}
                                onChangeItem={(item) =>
                                    setSelectedGun(item.value)
                                }
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Vítima</NormalLabel>
                            <DropDown
                                items={availableVictimOptions}
                                style={dropdownStyle}
                                defaultValue={selectedVictim}
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
                                items={availablePhysicalAgressionOptions}
                                style={dropdownStyle}
                                defaultValue={selectedPhysicalAggression}
                                onChangeItem={(item) =>
                                    setSelectedPhysicalAggression(item.value)
                                }
                            />
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Boletim de Ocorrência</NormalLabel>
                            <DropDown
                                items={availablePoliceReportOptions}
                                style={dropdownStyle}
                                defaultValue={selectedPoliceReport}
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
                        onPress={handleSubmit}
                    >
                        <SendLabel>
                            {isEditing
                                ? "Editar Ocorrência"
                                : "Registrar Ocorrência"}
                        </SendLabel>
                    </NormalSend>

                    <StayAlert
                        show={showSuccessfullyModal}
                        title={
                            isEditing
                                ? "Editar Ocorrência"
                                : "Registrar Ocorrência"
                        }
                        message={
                            isEditing
                                ? "Ocorrência editada com sucesso!"
                                : "Ocorrência cadastrada com sucesso!"
                        }
                        showConfirmButton
                        confirmText="Entendido"
                        onConfirmPressed={() => handleClosedModal()}
                        onDismiss={() => handleClosedModal()}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Occurrence;

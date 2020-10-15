import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CircularLoader from "../../components/CircularLoader";
import HeaderTitle from "../../components/HeaderTitle";
import {
    Container,
    KeyboardScrollView,
    NormalSend,
    SendLabel,
    NormalLabel,
} from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import { updateOccurrence, createOccurrence } from "../../services/occurrences";
import {
    formatDate,
    formatTime,
    formatDateTime,
    getOcurrenceDateTime,
} from "../../utils/dates";
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

type ParamOccurrence = {
    params: {
        occurrence: {
            id_occurrence: number;
            location: [number, number];
            gun: string;
            occurrence_date_time: string;
            register_date_time: string;
            occurrence_type: string;
            physical_aggression: boolean;
            police_report: boolean;
            victim: boolean;
        };
    };
};

const Occurrence: React.FC = () => {
    const navigation = useNavigation();
    const { data } = useUser();
    const registerOccurrenceRoute = useRoute<RouteProp<ParamList, "params">>();
    const editOccurrenceRoute = useRoute<
        RouteProp<ParamOccurrence, "params">
    >();

    const [isEditing, setIsEditing] = useState(false);
    const [idOccurrence, setIdOccurrence] = useState(0);

    const [selectedOccurrenceType, setSelectedOccurrenceType] = useState("");
    const [selectedGun, setSelectedGun] = useState("");
    const [selectedVictim, setSelectedVictim] = useState<boolean>();
    const [
        selectedPhysicalAggression,
        setSelectedPhysicalAggression,
    ] = useState<boolean>();
    const [selectedPoliceReport, setSelectedPoliceReport] = useState<boolean>();

    const [location, setLocation] = useState<[number, number]>([0, 0]);

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

    const [isLoading, setIsLoading] = useState(false);

    const currentDate = new Date();

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
        if (
            !editOccurrenceRoute.params ||
            !editOccurrenceRoute.params.occurrence
        ) {
            setLocation([
                registerOccurrenceRoute.params.latitude,
                registerOccurrenceRoute.params.longitude,
            ]);
            return null;
        }

        const occurrence = editOccurrenceRoute.params.occurrence;

        setIsEditing(true);
        setIdOccurrence(occurrence.id_occurrence);
        setSelectedOccurrenceType(occurrence.occurrence_type);
        setSelectedVictim(occurrence.victim);
        setSelectedGun(occurrence.gun);
        setLocation(occurrence.location);
        setSelectedPhysicalAggression(occurrence.physical_aggression);
        setSelectedPoliceReport(occurrence.police_report);
        const datetime = getOcurrenceDateTime(occurrence.occurrence_date_time);
        setDatetime(datetime);

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
    }, [editOccurrenceRoute]);

    const onChangeOccurrenceDatetime = (event, selectedDate) => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        const currentDate = selectedDate || datetime;
        setDatetime(currentDate);
    };

    const handleSubmit = async () => {
        const dataOccurrence = {
            occurrence_type: selectedOccurrenceType,
            gun: selectedGun,
            victim: selectedVictim,
            physical_aggression: selectedPhysicalAggression,
            police_report: selectedPoliceReport,
            occurrence_date_time: formatDateTime(datetime),
            location,
        };
        if (validateOccurrence(dataOccurrence)) {
            if (data.token !== "") {
                setIsLoading(true);
                const response = isEditing
                    ? await updateOccurrence(
                          idOccurrence,
                          data.token,
                          dataOccurrence
                      )
                    : await createOccurrence(dataOccurrence, data.token);

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
                setIsLoading(false);
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
                        {isLoading ? (
                            <CircularLoader size={20} />
                        ) : (
                            <SendLabel>
                                {isEditing
                                    ? "Editar Ocorrência"
                                    : "Registrar Ocorrência"}
                            </SendLabel>
                        )}
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

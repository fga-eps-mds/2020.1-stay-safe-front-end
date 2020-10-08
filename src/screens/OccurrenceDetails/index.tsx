import { useRoute, useFocusEffect, RouteProp } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTitle from "../../components/HeaderTitle";
import {
    Container,
    KeyboardScrollView,
    NormalLabel,
} from "../../components/NormalForms";
import { scale } from "../../utils/scalling";
import {
    occurrenceTypeItems,
    gunItems,
    physicalAggressionItems,
    policeReportItems,
    victimItems,
    dropdownStyle,
} from "../Occurrence/dropdownConstants";
import { InputContainer, Field, InputWrapper } from "./styles";

type ParamList = {
    params: {
        latitude: number;
        longitude: number;
    };
};

const OccurrenceDetails: React.FC = () => {
    const route = useRoute<RouteProp<ParamList, "params">>();

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const [occurrenceType, setOccurrenceType] = useState("");
    const [gun, setGun] = useState("");
    const [victim, setVictim] = useState("");
    const [physicalAggression, setPhysicalAggression] = useState("");
    const [policeReport, setPoliceReport] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const formatDate = (date: string) => {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        return `${day}/${month}/${year}`;
    };

    const formatTime = (time: string) => {
        const hours = time.slice(0, 2);
        const minutes = time.slice(3, 5);

        return `${hours}:${minutes}`;
    };

    const fetchData = () => {
        if (!route.params && !route.params.occurrence) return null;

        const occurrence = route.params.occurrence;
        occurrenceTypeItems.forEach((occur_type) => {
            if (occur_type.value === occurrence.occurrence_type)
                setOccurrenceType(occur_type.label);
        });
        gunItems.forEach((gun) => {
            if (gun.value === occurrence.gun) setGun(gun.label);
        });
        victimItems.forEach((victim) => {
            if (victim.value === occurrence.victim) setVictim(victim.label);
        });
        physicalAggressionItems.forEach((phys_aggres) => {
            if (phys_aggres.value === occurrence.physical_aggression)
                setPhysicalAggression(phys_aggres.label);
        });
        policeReportItems.forEach((pol_rep) => {
            if (pol_rep.value === occurrence.police_report)
                setPoliceReport(pol_rep.label);
        });

        const date = occurrence.occurrence_date_time.split(" ")[0];
        const time = occurrence.occurrence_date_time.split(" ")[1];
        setDate(formatDate(date));
        setTime(formatTime(time));
    };

    useFocusEffect(() => {
        fetchData();
    });

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Detalhes da Ocorrência" goBack />
                <KeyboardScrollView
                    style={{ width: "100%", alignSelf: "center" }}
                >
                    <InputContainer style={{ width: "80%", marginTop: 0 }}>
                        <NormalLabel style={{ fontSize: scale(16) }}>
                            Tipo de Ocorrência
                        </NormalLabel>
                        <Field>{occurrenceType}</Field>
                    </InputContainer>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Tipo de Arma</NormalLabel>
                            <Field>{gun}</Field>
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Vítima</NormalLabel>
                            <Field>{victim}</Field>
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Agressão Física</NormalLabel>
                            <Field>{physicalAggression}</Field>
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Boletim de Ocorrência</NormalLabel>
                            <Field>{policeReport}</Field>
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <InputContainer>
                            <NormalLabel>Data da Ocorrência</NormalLabel>
                            <Field>{date}</Field>
                        </InputContainer>

                        <InputContainer>
                            <NormalLabel>Hora da Ocorrência</NormalLabel>
                            <Field>{time}</Field>
                        </InputContainer>
                    </InputWrapper>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default OccurrenceDetails;

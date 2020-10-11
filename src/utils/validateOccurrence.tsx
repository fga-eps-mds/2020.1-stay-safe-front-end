import { Alert } from "react-native";

import { getOcurrenceDateTime } from "./dates";

interface OccurrenceFields {
    occurrence_type: string;
    gun: string;
    victim: boolean | undefined;
    physical_aggression: boolean | undefined;
    police_report: boolean | undefined;
    occurrence_date_time: string;
}

export const validateOccurrence = (data: OccurrenceFields) => {
    const currentDate = new Date();
    const error = ["Campo Inválido", ""];
    if (data.occurrence_type === null || data.occurrence_type === "") {
        error[1] = "Tipo de Ocorrência deve ser selecionado";
    } else if (data.gun === null || data.gun === "") {
        error[1] = "Tipo de Arma deve ser selecionado";
    } else if (data.victim === null || data.victim === undefined) {
        error[1] = "Vitima deve ser selecionado";
    } else if (
        data.physical_aggression === null ||
        data.physical_aggression === undefined
    ) {
        error[1] = "Agressão fisica deve ser selecionado";
    } else if (
        data.police_report === null ||
        data.police_report === undefined
    ) {
        error[1] = "Boletim de ocorrência deve ser selecionado";
    } else if (currentDate < getOcurrenceDateTime(data.occurrence_date_time)) {
        error[1] = "O horário selecionado é maior que o atual";
    }
    if (error[1] !== "") {
        Alert.alert(error[0], error[1]);
    }
    return error[1] === "";
};

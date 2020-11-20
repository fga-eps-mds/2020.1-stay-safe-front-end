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
    let error = "";

    if (data.occurrence_type === null || data.occurrence_type === "") {
        error = "Tipo de Ocorrência deve ser selecionado";
    } else if (data.gun === null || data.gun === "") {
        error = "Tipo de Arma deve ser selecionado";
    } else if (data.victim === null || data.victim === undefined) {
        error = "Vitima deve ser selecionado";
    } else if (
        data.physical_aggression === null ||
        data.physical_aggression === undefined
    ) {
        error = "Agressão fisica deve ser selecionado";
    } else if (
        data.police_report === null ||
        data.police_report === undefined
    ) {
        error = "Boletim de ocorrência deve ser selecionado";
    } else if (currentDate < getOcurrenceDateTime(data.occurrence_date_time)) {
        error = "O horário selecionado é maior que o atual";
    }

    return error;
};

import { Alert } from "react-native";

export const validateOccurrence = (data) => {
    const currentDate = new Date();
    const error = ["Campo Inválido", ""];
    if (data.occurrence_type === null || data.occurrence_type === "") {
        error[1] = "Tipo de Ocorrência deve ser selecionado";
    } else if (data.gun === null || data.gun === "") {
        error[1] = "Tipo de Arma deve ser selecionado";
    } else if (data.victim === null) {
        error[1] = "Vitima deve ser selecionado";
    } else if (data.physical_aggression === null) {
        error[1] = "Agressão fisica deve ser selecionado";
    } else if (data.police_report === null) {
        error[1] = "Boletim de ocorrência deve ser selecionado";
    } else if (currentDate < data.occurrence_date_time) {
        error[1] = "O horário selecionado é maior que o atual";
    }
    if (error[1] !== "") {
        Alert.alert(error[0], error[1]);
    }
    return error[1] === "";
};

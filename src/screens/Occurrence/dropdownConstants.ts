import { scale } from "../../utils/scalling";

export const occurrenceTypeItems = [
    {
        label: "Latrocínio",
        value: "Latrocínio",
    },
    {
        label: "Roubo a Transeunte",
        value: "Roubo a transeunte",
    },
    {
        label: "Roubo de Veículo",
        value: "Roubo de Veículo",
    },
    {
        label: "Roubo de Residência",
        value: "Roubo de Residência",
    },
    {
        label: "Estupro",
        value: "Estupro",
    },
];

export const gunItems = [
    {
        label: "Nenhuma",
        value: "None",
    },
    {
        label: "Arma de Fogo",
        value: "Fire",
    },
    {
        label: "Arma Branca",
        value: "White",
    },
];

export const victimItems = [
    {
        label: "Vítima",
        value: true,
    },
    {
        label: "Testemunha",
        value: false,
    },
];

export const physicalAggressionItems = [
    {
        label: "Sim",
        value: true,
    },
    {
        label: "Não",
        value: false,
    },
];

export const policeReportItems = [
    {
        label: "Sim",
        value: true,
    },
    {
        label: "Não",
        value: false,
    },
];

export const dropdownStyle = {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
    borderColor: "#ffffff",
};

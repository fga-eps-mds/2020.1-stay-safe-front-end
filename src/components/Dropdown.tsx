import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";

import { scale } from "../utils/scalling";

export const DropDown = styled(DropDownPicker).attrs((props) => ({
    placeholder: "Selecionar",
    containerStyle: {
        height: scale(42),
    },
    dropDownStyle: {
        backgroundColor: props.theme.primaryWhite,
        borderTopLeftRadius: scale(15),
        borderTopRightRadius: scale(15),
        borderBottomLeftRadius: scale(15),
        borderBottomRightRadius: scale(15),
    },
    labelStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(14),
        textAlign: "center",
        color: props.theme.primaryDarkBlue,
    },
    activeLabelStyle: {
        color: props.theme.primaryDarkBlue,
        fontFamily: "Trueno-SemiBold",
    },
    arrowColor: props.theme.primaryRed,
    arrowSize: 18,
}))`
    border: 0;
`;

export const dropdownStyle = {
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
};

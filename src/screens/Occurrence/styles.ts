import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const DropDown = styled(DropDownPicker).attrs({
    placeholder: "Selecionar",
    containerStyle: {
        height: scale(42),
    },
    dropDownStyle: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: scale(15),
        borderTopRightRadius: scale(15),
        borderBottomLeftRadius: scale(15),
        borderBottomRightRadius: scale(15),
    },
    labelStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(14),
        textAlign: "center",
        color: "#011640",
    },
    activeLabelStyle: {
        color: "#011640",
        fontFamily: "Trueno-SemiBold",
    },
    arrowColor: "#e83338",
    arrowSize: 18,
})``;

export const InputWrapper = styled.View`
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
`;

export const InputContainer = styled.View`
    width: 48%;
    margin-top: ${scale(30)}px;
    flex-direction: column;
    justify-content: space-between;
`;

export const TouchablePicker = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    height: ${scale(42)}px;
    width: 100%;
    align-items: center;
    background-color: #ffffff;
    border-radius: ${scale(15)}px;
    padding: ${scale(12)}px;
`;

export const PlaceholderPicker = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: #011640;
`;

export const DatePicker = styled(DateTimePicker).attrs({
    testID: "datePicker",
    mode: "date",
    display: "default",
})``;

export const TimePicker = styled(DateTimePicker).attrs({
    testID: "timePicker",
    mode: "time",
    display: "default",
})``;

import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

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

export const PlaceholderPicker = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
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

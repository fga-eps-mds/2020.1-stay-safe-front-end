import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

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

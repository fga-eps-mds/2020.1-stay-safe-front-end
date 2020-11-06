import Dialog from "react-native-dialog";
import { FAB } from "react-native-paper";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const PlaceTitle = styled.Text`
    font-size: ${scale(16)}px;
    font-family: "Trueno-SemiBold";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
    max-width: 80%;
`;

export const PlaceCard = styled.View`
    background-color: ${(props) => props.theme.primaryWhite};
    width: 80%;
    flex-direction: row;
    padding: ${scale(14)}px;
    margin-bottom: ${scale(20)}px;
    border-radius: ${scale(20)}px;
    justify-content: center;
    align-items: center;
`;

export const DeletePlace = styled.TouchableOpacity`
    right: 5%;
    position: absolute;
`;

export const AddPlace = styled(FAB)`
    background-color: ${(props) => props.theme.primaryRed};
    position: absolute;
    margin: ${scale(16)}px;
    right: 0;
    bottom: 0;
`;

export const DialogTitle = styled(Dialog.Title)`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: #010a26;
    padding-bottom: ${scale(8)}px;
    align-self: center;
`;

export const DialogDescription = styled(Dialog.Description)`
    width: 80%;
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: #011640;
    padding-bottom: ${scale(16)}px;
    align-self: center;
    text-align: center;
`;

export const DialogInput = styled(Dialog.Input).attrs((props) => ({
    placeholderTextColor: "#c8c8c8",
    autoCapitalize: "none",
    multiline: false,
    maxLength: 30,
}))`
    height: ${scale(42)}px;
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    border-width: ${scale(1)}px;
    border-radius: ${scale(14)}px;
    border-color: #010a26;
    padding-left: ${scale(12)}px;
    color: #010a26;
`;

export const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const DialogButton = styled(Dialog.Button)`
    width: 100%;
    background-color: #7dbfe2;
    border-radius: ${scale(10)}px;
    padding: ${scale(8)}px;
    margin-right: ${scale(16)}px;
`;

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

export const DialogContainer = styled(Dialog.Container).attrs((props) => ({
    contentStyle: {
        backgroundColor: props.theme.primaryWhite,
        borderRadius: scale(16),
        padding: scale(16),
    },
    headerStyle: {
        margin: 0,
    },
}))``;

export const DialogTitle = styled(Dialog.Title)`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    padding-bottom: ${scale(8)}px;
    align-self: center;
`;

export const DialogDescription = styled(Dialog.Description)`
    width: 80%;
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    padding-bottom: ${scale(16)}px;
    align-self: center;
    text-align: center;
`;

export const DialogInput = styled(Dialog.Input).attrs((props) => ({
    placeholderTextColor: props.theme.primaryGray,
    autoCapitalize: "none",
    multiline: false,
    maxLength: 30,
}))`
    height: ${scale(42)}px;
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    border-width: ${scale(1)}px;
    border-radius: ${scale(14)}px;
    border-color: ${(props) => props.theme.primarySuperDarkBlue};
    padding-left: ${scale(12)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
`;

export const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const DialogButton = styled(Dialog.Button)`
    width: 120%;
    background-color: ${(props) => props.theme.primaryLightBlue};
    border-radius: ${scale(28)}px;
    padding: ${scale(12)}px;
`;

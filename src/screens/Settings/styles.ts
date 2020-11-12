import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { NormalSend, SendLabel } from "../../components/NormalForms";
import { scale } from "../../utils/scalling";

export const ButtonsContainer = styled.View`
    width: 80%;
`;

export const Button = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))`
    padding: ${scale(15)}px;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(12)}px;
    flex-direction: row;
    margin-bottom: ${scale(17)}px;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    font-family: Trueno-SemiBold;
    margin-left: ${scale(10)}px;
`;

export const UserButtonsContainer = styled.View`
    padding: ${scale(30)}px ${scale(110)}px;
    justify-content: center;
    align-items: center;
`;

export const LogoutButton = styled(NormalSend)`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const DeleteButton = styled(RectButton)`
    margin-top: ${scale(28)}px;
`;

export const DeleteText = styled(SendLabel)`
    color: ${(props) => props.theme.primaryBlack};
    opacity: 0.3;
`;

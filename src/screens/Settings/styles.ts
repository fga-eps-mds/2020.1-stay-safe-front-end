import styled from "styled-components/native";

import { SendLabel } from "../../components/NormalForms";
import { scale } from "../../utils/scalling";

export const ButtonsContainer = styled.View`
    width: 80%;
`;

export const ButtonText = styled.Text`
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    font-family: Trueno-SemiBold;
    margin-left: ${scale(10)}px;
`;

export const UserButtonsContainer = styled.View`
    padding: ${scale(30)}px ${scale(120)}px;
    justify-content: center;
    align-items: center;
`;

export const DeleteButton = styled.TouchableOpacity`
    margin-top: ${scale(28)}px;
`;

export const DeleteText = styled(SendLabel)`
    color: ${(props) => props.theme.primaryBlack};
    opacity: 0.3;
`;

import styled, { css } from "styled-components/native";

import {
    SendLabel,
    NormalInput,
    NormalSend,
} from "../../components/NormalForms";
import { scale } from "../../utils/scalling";

interface InputViewingProps {
    isEditing?: boolean;
}

export const InputViewing = styled(NormalInput)<InputViewingProps>`
    width: 80%;
    background-color: ${(props) =>
        props.isEditing
            ? props.theme.type === "dark"
                ? props.theme.primaryBlack
                : props.theme.primaryWhite
            : props.theme.type === "dark"
            ? props.theme.primaryWhite
            : props.theme.primaryBackground};
    height: ${scale(40)}px;
`;

export const ButtonsContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    margin-bottom: 30px;
`;

export const ProfileButton = styled(NormalSend)`
    width: 70%;
    flex-direction: row;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryDarkBlue};
`;

export const EditButton = styled(ProfileButton)`
    width: 45%;
    background-color: ${(props) => props.theme.primaryRed};
    margin-bottom: ${(props) => (props.isEditing ? `${scale(30)}px` : "0px")};
`;

export const ButtonLabel = styled(SendLabel)`
    margin-left: ${scale(10)}px;
`;

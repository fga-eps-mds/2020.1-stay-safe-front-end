import styled from "styled-components/native";

import { NormalInput } from "../../components/NormalForms";
import { scale } from "../../utils/scalling";

interface InputViewingProps {
    isEditing?: boolean;
}

export const InputViewing = styled(NormalInput)<InputViewingProps>`
    width: 80%;
    background-color: ${(props) =>
        props.isEditing
            ? props.theme.type === "dark"
                ? props.theme.primaryLightBlue + "60"
                : props.theme.primaryWhite
            : props.theme.type === "dark"
            ? props.theme.primaryWhite
            : props.theme.primaryLightGray};
    height: ${scale(40)}px;
`;

export const ButtonsContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    margin-bottom: 30px;
`;

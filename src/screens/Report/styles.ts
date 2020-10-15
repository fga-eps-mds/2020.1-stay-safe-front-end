import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const ButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const AlertButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    background-color: ${(props) => props.theme.primaryRed};
    border-radius: ${scale(28)}px;
    padding: ${scale(8)}px;
`;

import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

import { scale } from "../../utils/scalling";

interface NormalButtonProps {
    width: string;
    color: string;
    enabled: boolean;
    isEditing: boolean;
    settings: boolean;
    borderRadius: number;
}

export const NormalButton = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))<NormalButtonProps>`
    width: ${(props) => props.width};

    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.enabled ? props.color : props.theme.primaryGray};

    border-radius: ${(props) => scale(props.borderRadius)}px;
    padding: ${scale(12)}px;
    margin-bottom: ${(props) => (props.isEditing ? scale(30) : 0)}px;
    margin-top: ${(props) => (props.settings ? 0 : scale(18))}px;

    ${(props) =>
        props.settings &&
        css`
            margin-bottom: ${scale(17)}px;
            justify-content: flex-start;
            border-radius: ${scale(12)}px;
        `}
`;

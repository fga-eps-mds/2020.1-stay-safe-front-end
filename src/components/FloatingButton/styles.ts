import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

import { scale } from "../../utils/scalling";

interface FloatingButtonStyledProps {
    position: "right-bottom" | "right-top";
}

export const FloatingButtonStyled = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))<FloatingButtonStyledProps>`
    position: absolute;
    width: ${scale(50)}px;
    height: ${scale(50)}px;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryWhite};
    z-index: 6;
    elevation: 15;
    border-radius: ${scale(50)}px;

    ${(props) =>
        props.position === "right-top" &&
        css`
            top: 8%;
            right: 6%;
        `}

    ${(props) =>
        props.position === "right-bottom" &&
        css`
            bottom: 8%;
            right: 6%;
        `}
`;

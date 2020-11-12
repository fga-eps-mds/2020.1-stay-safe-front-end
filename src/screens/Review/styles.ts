import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const NeighborhoodTitle = styled.Text`
    font-size: ${scale(16)}px;
    font-family: "Trueno-Regular";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

export const NeighborhoodCard = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))`
    background-color: ${(props) => props.theme.primaryWhite};
    width: 85%;
    padding: ${scale(14)}px;
    margin-bottom: ${scale(20)}px;
    border-radius: ${scale(20)}px;
    align-items: center;
`;

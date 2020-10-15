import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const HeaderTitleContainer = styled.View`
    width: 100%;
    height: ${scale(60)}px;
    background-color: ${(props) => props.theme.primaryBackground};
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryRed};
    line-height: ${scale(20)}px;
    font-family: Trueno-SemiBold;
`;

export const GoBackContainer = styled.View`
    left: 5%;
    position: absolute;
`;

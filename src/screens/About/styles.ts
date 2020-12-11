import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const AppTitle = styled.Text`
    font-family: "Age";
    font-size: ${scale(32)}px;
    letter-spacing: ${scale(1)}px;
    color: ${(props) => props.theme.primaryRed};
    text-align: center;
    margin-bottom: ${scale(34)}px;
`;

export const AboutText = styled.Text`
    font-family: "Trueno-Regular";
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: justify;
    padding-horizontal: ${scale(32)}px;
`;
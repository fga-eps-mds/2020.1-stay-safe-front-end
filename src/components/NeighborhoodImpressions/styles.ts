import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const ImpressionsContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    margin-bottom: 0;
`;

export const ImpressionText = styled.Text`
    font-size: ${scale(12)}px;
    font-family: "Trueno-Regular";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

export const Impression = styled.View`
    width: 30%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const NeighborhoodTitle = styled.Text`
    font-size: ${scale(16)}px;
    font-family: "Trueno-Regular";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

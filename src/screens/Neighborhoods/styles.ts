import styled from "styled-components/native";

import { Card } from "../../components/Cards";
import { scale } from "../../utils/scalling";

export const NeighborhoodTitle = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    width: 80%;
    text-align: left;
`;

export const NeighborhoodCard = styled(Card)`
    width: 80%;
    align-items: center;
    align-self: center;
    margin-bottom: 0;
`;

export const AverageContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;

export const AverageNumber = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(20)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    padding-left: ${scale(5)}px;
`;

export const NoStatisticsText = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: center;
    margin: ${scale(5)}px 0;
`;

export const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

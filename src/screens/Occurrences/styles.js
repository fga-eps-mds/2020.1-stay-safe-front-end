import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const ScrollViewStyled = styled.ScrollView`
    flex: 1;
    background-color: #f0f0f5;
`;

export const CardContainer = styled.View`
    flex: 1;
    padding-top: ${scale(18)}px;
    align-items: center;
`;

export const Card = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: #ffffff;
    width: 80%;
    border-radius: ${scale(16)}px;
    margin-bottom: ${scale(18)}px;
    padding: ${scale(18)}px;
`;

export const CardData = styled.View`
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: #011640;
    margin-bottom: 4%;
    text-align: left;
`;

export const Date = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: #011640;
    margin-bottom: 4%;
    text-align: left;
`;

export const CardActions = styled.View`
    justify-content: space-between;
    min-height: ${scale(50)}px;
`;

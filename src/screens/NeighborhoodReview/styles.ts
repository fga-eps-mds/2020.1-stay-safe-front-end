import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const NeighborhoodTitle = styled.Text`
    font-size: ${scale(12)}px;
    font-family: "Trueno-Regular";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

export const NeighborhoodText = styled.Text`
    font-size: ${scale(13)}px;
    font-family: "Trueno-Regular";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

export const StarContainer = styled.View`
    width: 80%;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    padding-bottom: ${scale(10)}px;
    border-bottom-width: ${scale(1)}px;
`;

export const ImpressionText = styled.Text`
    font-size: ${scale(14)}px;
    font-family: "Trueno-Regular";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    margin-top: ${scale(20)}px;
    margin-bottom: ${scale(20)}px;
    text-align: center;
`;

export const ImpressionsCaption = styled.Text`
    font-family: "Trueno-Regular";
    font-size: ${scale(11)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

export const StatisticsNeighborhoodCard = styled.View`
    width: 85%;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(20)}px;
    align-items: center;
    padding: ${scale(25)}px;
`;

export const NeighborhoodAverage = styled.Text`
    font-family: "Trueno-Regular";
    font-size: ${scale(30)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
`;

export const EvaluateButton = styled.TouchableOpacity`
    width: 60%;
    height: ${scale(40)}px;
    margin-top: ${scale(30)}px;
    background-color: ${(props) => props.theme.primaryRed};
    border-radius: ${scale(25)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const EvaluateButtontText = styled.Text`
    font-family: "Trueno-SemiBold";
    font-size: ${scale(15)}px;
    color: ${(props) => props.theme.primaryWhite};
    margin-left: ${scale(5)}px;
`;
export const TitleCity = styled.Text`
    margin-top: ${scale(24)}px;
    margin-bottom: ${scale(10)}px;
    font-family: "Trueno-Regular";
    font-size: ${scale(20)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

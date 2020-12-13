import { Animated } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

interface CrimeBarProps {
    percentage: number;
}

export const StatisticsContainer = styled.View`
    width: 85%;
    min-height: ${scale(200)}px;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(20)}px;
    align-items: center;
`;

export const DropDownContainer = styled.View`
    width: 90%;
    height: ${scale(50)}px;
    margin-top: ${scale(20)}px;
    padding-left: ${scale(20)}px;
    padding-right: ${scale(12)}px;
    padding-top: ${scale(2)}px;
    padding-bottom: ${scale(2)}px;
    border-radius: ${scale(20)}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TitleContainer = styled.View`
    flex-direction: row;
`;

export const Title = styled.Text`
    font-size: ${scale(16)}px;
    font-family: "Trueno-Regular";
    margin-left: ${scale(7)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
`;

export const DropDown = styled(DropDownPicker).attrs((props) => ({
    placeholder: "Selecionar",
    dropDownStyle: {
        backgroundColor: props.theme.primaryWhite,
        borderTopLeftRadius: scale(15),
        borderTopRightRadius: scale(15),
        borderBottomLeftRadius: scale(15),
        borderBottomRightRadius: scale(15),
    },
    labelStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(16),
        textAlign: "center",
        color: props.theme.primaryDarkBlue,
    },
    activeLabelStyle: {
        color: props.theme.primaryDarkBlue,
        fontSize: scale(17),
        fontFamily: "Trueno-SemiBold",
    },
    arrowColor: props.theme.primaryRed,
    arrowSize: 18,
}))`
    border: 0;
    background-color: ${(props) => props.theme.primaryWhite};
`;

export const Statistics = styled.View`
    width: 90%;
    border-top-width: ${scale(1)}px;
    border-top-color: ${(props) => props.theme.primaryDarkBlue};
    margin-top: ${scale(5)}px;
    border-radius: ${scale(20)}px;
    align-items: center;
    margin-bottom: ${scale(20)}px;
    padding: ${scale(5)}px;
`;

export const StatsContainer = styled.View`
    width: 90%;
    height: ${scale(50)}px;
    margin-top: ${scale(15)}px;
    flex-direction: column;
`;

export const StatsText = styled.Text`
    font-family: "Trueno-SemiBold";
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: ${scale(5)}px;
`;

export const StatsBar = styled(Animated.View)<CrimeBarProps>`
    width: ${(props) => props.percentage * 0.87}%;
    height: ${scale(21)}px;
    background-color: ${(props) => props.theme.primaryLightBlue};
    justify-content: center;
    align-items: flex-end;
`;

export const StatsBarNumber = styled.Text`
    font-family: "Trueno-Regular";
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-left: ${scale(2)}px;
`;

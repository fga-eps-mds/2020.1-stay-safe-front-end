import { Animated } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styled, { css } from "styled-components/native";

import { scale } from "../../utils/scalling";

interface CrimeBarProps {
    percentage: number;
}

interface CrimeStatisticsProps {
    loading: boolean;
}

export const StatisticsCard = styled.View`
    width: 85%;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(20)}px;
    align-items: center;
`;

export const YearContainer = styled.View`
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

export const YearTitleContainer = styled.View`
    flex-direction: row;
`;

export const YearTitle = styled.Text`
    font-size: ${scale(16)}px;
    font-family: "Trueno-Regular";
    margin-left: ${scale(7)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
`;

export const YearDropDown = styled(DropDownPicker).attrs((props) => ({
    placeholder: "Selecionar",
    containerStyle: {
        height: scale(42),
        width: scale(80),
    },
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

export const CrimeStatistics = styled.View<CrimeStatisticsProps>`
    width: 90%;
    border-top-width: ${(props) => (props.loading ? scale(0) : scale(1))}px;
    border-top-color: ${(props) => props.theme.primaryDarkBlue};
    margin-top: ${scale(5)}px;
    border-radius: ${scale(20)}px;
    align-items: center;
    margin-bottom: ${scale(20)}px;
    padding: ${scale(5)}px;

    ${(props) =>
        props.loading
            ? css`
                  padding: ${scale(5)}px;
              `
            : css`
                  padding: ${scale(0)}px;
                  padding-bottom: ${scale(15)}px;
              `};
`;

export const CrimeContainer = styled.View`
    width: 90%;
    height: ${scale(50)}px;
    margin-top: ${scale(15)}px;
    flex-direction: column;
`;

export const CrimeText = styled.Text`
    font-family: "Trueno-SemiBold";
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: ${scale(5)}px;
`;

export const CrimeBar = styled(Animated.View)<CrimeBarProps>`
    width: ${(props) => props.percentage * 0.87}%;
    height: ${scale(21)}px;
    background-color: ${(props) => props.theme.primaryLightBlue};
    justify-content: center;
    align-items: flex-end;
`;

export const CrimeBarNumber = styled.Text`
    font-family: "Trueno-Regular";
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-left: ${scale(2)}px;
`;

export const SortButtontText = styled.Text`
    font-family: "Trueno-SemiBold";
    font-size: ${scale(15)}px;
    color: ${(props) => props.theme.primaryWhite};
    margin-left: ${scale(5)}px;
`;

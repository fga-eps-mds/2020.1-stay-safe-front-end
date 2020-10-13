import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

interface CrimeBarProps {
    percentage: number;
}

export const StatisticsCard = styled.View`
    width: 80%;
    background-color: #ffffff;
    border-radius: ${scale(20)}px;
    align-items: center;
`;

export const YearContainer = styled.View`
    width: 90%;
    height: ${scale(50)}px;
    margin-top: ${scale(32)}px;
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
`;

export const YearDropDown = styled(DropDownPicker).attrs({
    placeholder: "Selecionar",
    containerStyle: {
        height: scale(42),
        width: scale(80),
    },
    dropDownStyle: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: scale(15),
        borderTopRightRadius: scale(15),
        borderBottomLeftRadius: scale(15),
        borderBottomRightRadius: scale(15),
    },
    labelStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(16),
        textAlign: "center",
        color: "#011640",
    },
    activeLabelStyle: {
        color: "#011640",
        fontFamily: "Trueno-SemiBold",
    },
    arrowColor: "#e83338",
    arrowSize: 18,
})`
    border: 0;
`;

export const CrimeStatistics = styled.View`
    width: 90%;
    border: ${scale(1.5)}px #011640;
    margin-top: ${scale(41)}px;
    border-radius: ${scale(20)}px;
    align-items: center;
    padding-bottom: ${scale(15)};
    margin-bottom: ${scale(20)}px;
`;

export const CrimeContainer = styled.View`
    width: 90%;
    height: ${scale(50)}px;
    margin-top: ${scale(15)}px;
    /* background-color: #000; */
    flex-direction: column;
`;

export const CrimeText = styled.Text`
    font-family: "Trueno-SemiBold";
    font-size: ${scale(14)}px;
    color: #011640;
    margin-bottom: ${scale(5)}px;
`;

export const CrimeBar = styled.View<CrimeBarProps>`
    width: ${(props) => props.percentage * 0.95}%;
    height: ${scale(21)}px;
    background-color: #7dbfe2;
    justify-content: center;
    align-items: flex-end;
`;

export const CrimeBarNumber = styled.Text`
    font-family: "Trueno-Regular";
    font-size: ${scale(14)}px;
    color: #011640;
    margin-left: ${scale(2)}px;
`;

export const SortButton = styled.TouchableOpacity`
    width: 60%;
    height: ${scale(41)}px;
    margin-top: ${scale(27)}px;
    background-color: #e83338;
    border-radius: ${scale(25)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const SortButtontText = styled.Text`
    font-family: "Trueno-SemiBold";
    font-size: ${scale(15)}px;
    color: #ffffff;
    margin-left: ${scale(5)}px;
`;

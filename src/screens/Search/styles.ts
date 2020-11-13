import { scale } from "../../utils/scalling";

import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

export const SearchTabContainer = styled.View`
    align-items: center;
    justify-content: center;
    width: 85%;
`;

export const DropDownsContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 85%;
`;

export const UfDropDown = styled(DropDownPicker).attrs((props) => ({
    placeholder: "UF",
    containerStyle: {
        height: scale(42),
        width: '30%',
    },
    dropDownStyle: {
        backgroundColor: props.theme.primaryWhite,
        borderTopLeftRadius: scale(15),
        borderTopRightRadius: scale(15),
        borderBottomLeftRadius: scale(15),
        borderBottomRightRadius: scale(15),
        height: scale(80)
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
    margin-right: ${scale(5)}px;
    background-color: ${(props) => props.theme.primaryWhite};
`;

export const CityDropDown = styled(DropDownPicker).attrs((props) => ({
    placeholder: "Cidade",
    containerStyle: {
        height: scale(42),
        width: '70%',
    },
    dropDownStyle: {
        backgroundColor: props.theme.primaryWhite,
        borderTopLeftRadius: scale(15),
        borderTopRightRadius: scale(15),
        borderBottomLeftRadius: scale(15),
        borderBottomRightRadius: scale(15),
        height: scale(200)
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



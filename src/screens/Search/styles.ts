import styled from "styled-components/native";

import { DropDown } from "../../components/Dropdown";
import { scale } from "../../utils/scalling";

export const DropDownsContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
`;

export const UfDropDown = styled(DropDown).attrs((props) => ({
    placeholder: "UF",
    containerStyle: {
        height: scale(42),
        width: "25%",
    },
    labelStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(16),
        textAlign: "center",
        color: props.theme.primaryDarkBlue,
    },
}))``;

export const CityDropDown = styled(UfDropDown).attrs((props) => ({
    placeholder: "Cidade",
    containerStyle: {
        height: scale(42),
        width: "70%",
    },
}))``;

export const NeighborhoodDropDown = styled(UfDropDown).attrs((props) => ({
    placeholder: "Bairro",
    containerStyle: {
        height: scale(42),
        width: "80%",
    },
}))``;

export const NotFoundText = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    text-align: center;
    color: ${(props) => props.theme.primaryDarkBlue};
`;

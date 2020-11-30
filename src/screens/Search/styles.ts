import styled from "styled-components/native";

import { DropDown } from "../../components/Dropdown";
import { scale } from "../../utils/scalling";

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

export const SearchBarContainer = styled.View`
    width: 80%;
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
`;

export const SearchIcon = styled.View`
    position: absolute;
    right: 5%;
    top: ${scale(12)}px;
`;

import { scale } from "../../utils/scalling";

import styled from "styled-components/native";




export const SearchText = styled.Text`
    font-size: ${scale(13)}px;
    font-family: "Trueno-Regular";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

export const SearchTabContainer = styled.View`
    width: 80%;
    align-items: center;
    justify-content: center;
    
    /* border-radius: ${scale(10)}px; */
    background-color: #000000;
`;


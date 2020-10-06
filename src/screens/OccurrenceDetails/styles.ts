import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const InputWrapper = styled.View`
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
`;

export const InputContainer = styled.View`
    width: 48%;
    margin-top: ${scale(30)}px;
    flex-direction: column;
    justify-content: space-between;
`;

export const Field = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(15)}px;
    color: #011640;
    margin-bottom: 4%;
    text-align: left;
`;

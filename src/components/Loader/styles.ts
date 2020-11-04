import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const ModalBack = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryBlack + "90"};
`;

export const LoaderWrapper = styled.View`
    background-color: transparent;
    height: ${scale(100)}px;
    width: ${scale(100)}px;
    border-radius: ${scale(10)}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

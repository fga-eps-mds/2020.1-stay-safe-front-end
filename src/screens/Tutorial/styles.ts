import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryWhite};
`;

export const Title = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(22)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: center;
`;

export const ImageSlide = styled.Image`
    height: ${scale(320)}px;
    resize-mode: contain;
    margin-vertical: ${scale(32)}px;
`;

export const Text = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: center;
`;
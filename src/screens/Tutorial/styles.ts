import AppIntroSlider from "react-native-app-intro-slider";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const TutorialSlider = styled(AppIntroSlider).attrs(() => ({
    showPrevButton: true,
}))``;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryBackground};
`;

export const DotsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: ${scale(40)}px;
    left: 0px;
`;

export const Dot = styled.TouchableOpacity`
    width: ${scale(10)}px;
    height: ${scale(10)}px;
    background-color: ${(props) =>
        props.selected ? props.theme.primaryRed : props.theme.primaryWhite};
    border-radius: ${scale(10)}px;
    margin-horizontal: ${scale(3)}px;
`;

export const Title = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(22)}px;
    color: ${(props) => props.theme.primaryRed};
    text-align: center;
`;

export const ImageSlide = styled.Image`
    height: ${scale(320)}px;
    resize-mode: contain;
    margin-vertical: ${scale(30)}px;
`;

export const Description = styled.Text`
    width: 80%;
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: center;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: ${scale(20)}px;
    left: 0px;
    padding-horizontal: ${scale(20)}px;
`;

export const Button = styled.TouchableOpacity`
    padding-horizontal: ${scale(18)}px;
    padding-vertical: ${scale(12)}px;
    border-radius: ${scale(14)}px;
    background-color: ${(props) => props.theme.primaryRed};
`;

export const ButtonLabel = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: #ffffff;
    text-align: center;
`;

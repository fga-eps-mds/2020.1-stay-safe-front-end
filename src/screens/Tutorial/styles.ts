import styled from "styled-components/native";

import AppIntroSlider from "react-native-app-intro-slider";
import { scale } from "../../utils/scalling";

export const TutorialSlider = styled(AppIntroSlider).attrs((props) => ({
    showPrevButton: true,
    prevLabel: "Voltar",
    nextLabel: "Avançar",
    doneLabel: "Entendido!",
    dotStyle: {
        backgroundColor: props.theme.primaryGray,
    },
    activeDotStyle: {
        backgroundColor: props.theme.primaryRed,
    },
}))``;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryWhite};
`;

export const ButtonContainer = styled.View`
    position: absolute;
    bottom: ${scale(20)}px;
    left: ${scale(20)}px;
    right: ${scale(20)}px;
    flex-direction: row;
    justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
    width: 35%;
    padding-vertical: ${scale(12)}px;
    border-radius: ${scale(12)}px;
    background-color: ${(props) => props.theme.primarySuperDarkBlue};
`;

export const ButtonLabel = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: center;
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

export const Description = styled.Text`
    width: 80%;
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: center;
`;

import { RectButton } from "react-native-gesture-handler";
import { AirbnbRating } from "react-native-ratings";
import styled, { css } from "styled-components/native";

import { scale } from "../../utils/scalling";

interface ImpressionProps {
    color: string;
    select?: boolean;
}

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${(props) => props.theme.primaryBackground};
`;

export const LocalName = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(18)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: ${scale(20)}px;
    text-align: center;
`;

export const StarsRating = styled(AirbnbRating).attrs({
    size: scale(28),
    count: 5,
    showRating: false,
    starContainerStyle: {
        marginBottom: scale(34),
    },
})``;

export const TellUs = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: ${scale(20)}px;
    text-align: center;
`;

export const DetailContainer = styled.View`
    width: 80%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: ${scale(15)}px;
`;

export const TumbsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 40%;
    margin-left: ${scale(7)}px; 
`;

export const Detail = styled.View`
    width: 60%;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(16)}px;
    padding: ${scale(8)}px;
`;

export const DetailLabel = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: center;
`;

export const ImpressionContainer = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))<ImpressionProps>`
    background-color: ${(props) =>
        props.select ? props.color : props.theme.primaryWhite};
    padding: ${scale(8)}px;
    border: ${scale(0.5)}px;
    border-radius: ${scale(16)}px;
    border-color: ${(props) =>
        props.select ? props.color : props.theme.primaryWhite};

    ${(props) =>
        !props.select &&
        css`
            opacity: 0.7;
        `};
    margin: ${scale(7)}px;
`;

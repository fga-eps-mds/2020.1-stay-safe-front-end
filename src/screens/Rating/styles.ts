import styled from "styled-components/native";

import { AirbnbRating } from 'react-native-ratings';
import { scale } from "../../utils/scalling";

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
        marginBottom: scale(34)
    }
})``;

export const TellUs = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: ${scale(20)}px;
    text-align: center;
`;

export const Detail = styled.TouchableOpacity`
    width: 80%;
    background-color: ${(props) => props.selected ? '#c9c9c9' : '#ffffff'};
    border-radius: ${scale(16)}px;
    elevation: 1;
    margin-bottom: ${scale(12)}px;
    padding: ${scale(8)}px
`;

export const DetailLabel = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
`;
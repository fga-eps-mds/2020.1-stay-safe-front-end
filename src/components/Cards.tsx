import styled from "styled-components/native";

import { scale } from "../utils/scalling";

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
    },
})`
    flex: 1;
    background-color: ${(props) => props.theme.primaryBackground};
`;

export const CardContainer = styled.View`
    flex: 1;
    padding-top: ${scale(18)}px;
    width: 80%;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(16)}px;
    margin-bottom: ${scale(18)}px;
    padding: ${scale(12)}px ${scale(17)}px;
`;

export const CardData = styled.View`
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: ${scale(18)}px;
    text-align: left;
`;

export const TouchableCard = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.primaryWhite};
    width: 100%;
    border-radius: ${scale(16)}px;
    margin-bottom: ${scale(12)}px;
    padding: ${scale(12)}px ${scale(17)}px;
`;

export const CardContent = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

export const NeighText = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: ${scale(10)}px;
    text-align: left;
`;

export const Date = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: left;
`;

export const CardActions = styled.View`
    flex-direction: column;
    justify-content: space-between;
    max-height: 100%;
`;

export const TouchableAction = styled.TouchableOpacity`
    background-color: ${(props) =>
        props.theme.type === "dark"
            ? props.theme.primaryLightBlue
            : props.theme.primaryDarkBlue};
    border-radius: ${scale(10)}px;
    padding: ${scale(5)}px;
`;

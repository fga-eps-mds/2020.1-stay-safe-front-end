import { FAB } from "react-native-paper";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const PlaceTitle = styled.Text`
    font-size: ${scale(16)}px;
    font-family: "Trueno-SemiBold";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
    max-width: 80%;
`;

export const PlaceCard = styled.View`
    background-color: ${(props) => props.theme.primaryWhite};
    width: 80%;
    flex-direction: row;
    padding: ${scale(14)}px;
    margin-bottom: ${scale(20)}px;
    border-radius: ${scale(20)}px;
    justify-content: center;
    align-items: center;
`;

export const DeletePlace = styled.TouchableOpacity`
    right: 5%;
    position: absolute;
`;

export const AddPlace = styled(FAB)`
    background-color: ${(props) => props.theme.primaryRed};
    position: absolute;
    margin: ${scale(16)}px;
    right: 0;
    bottom: 0;
`;

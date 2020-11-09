import Modal from "react-native-modalbox";
import styled from "styled-components/native";

import { scale } from "../utils/scalling";

interface ColorProps {
    color: string;
}

export const InfoModal = styled(Modal)`
    position: absolute;
    height: ${scale(400)}px;
    width: 80%;
    border-radius: ${scale(24)}px;
    background-color: ${(props) => props.theme.primaryWhite};
    elevation: 15;
    padding: ${scale(20)}px ${scale(10)}px;
`;

export const InfoTitle = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    margin-bottom: ${scale(28)}px;
    text-align: center;
`;

export const InfoContainer = styled.View`
    align-items: flex-start;
    margin-bottom: ${scale(8)}px;
`;

export const Info = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${scale(14)}px;
`;

export const InfoColor = styled.View<ColorProps>`
    background-color: ${(props) =>
        props.color ? props.color : props.theme.primaryBlack};
    border-radius: ${scale(30)}px;
    height: ${scale(25)}px;
    width: ${scale(25)}px;
    margin-right: ${scale(14)}px;
`;

export const InfoText = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
`;

export const InfoSubText = styled.Text`
    font-family: Trueno-Regular;
    font-size: ${scale(12)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: center;
`;

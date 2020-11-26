import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

export const ModalBack = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    background-color: ${(props) => props.theme.primaryBlack + "40"};
    over
`;

export const ModalWrapper = styled.View`
    width: 100%;
    background-color: ${(props) => props.theme.primaryWhite};
    padding: ${scale(18)}px;
    border-top-right-radius: ${scale(22)}px;
    border-top-left-radius: ${scale(22)}px;
    justify-content: center;
`;

export const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ModalText = styled.Text`
    font-size: ${scale(14)}px;
    font-family: "Trueno-SemiBold";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    text-align: left;
`;

export const XContainer = styled.TouchableOpacity``;

export const MapContainer = styled.View`
    height: ${scale(400)}px;
    width: 100%;
    border-radius: ${scale(16)}px;
    margin-top: ${scale(18)}px;
    overflow: hidden;
`;

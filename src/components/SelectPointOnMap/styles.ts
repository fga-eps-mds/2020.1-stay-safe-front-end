import styled, { css } from "styled-components/native";

import { scale } from "../../utils/scalling";

export const ModalBack = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    background-color: ${(props) => props.theme.primaryBlack + "40"};
`;

export const ModalWrapper = styled.View`
    width: 100%;
    background-color: ${(props) => props.theme.primaryWhite};
    padding: ${scale(18)}px;
    border-top-right-radius: ${scale(22)}px;
    border-top-left-radius: ${scale(22)}px;
    justify-content: center;
    align-items: center;
`;

export const TitleContainer = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
`;

export const ModalText = styled.Text`
    font-size: ${scale(14)}px;
    font-family: "Trueno-SemiBold";
    color: ${(props) => props.theme.primarySuperDarkBlue};
    width: 80%;
    text-align: left;
`;

export const XContainer = styled.TouchableOpacity``;

export const MapContainer = styled.View`
    height: 80%;
    width: 100%;
    border-radius: ${scale(16)}px;
    margin-top: ${scale(18)}px;
    overflow: hidden;
`;

export const DoneButtonContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const DoneButton = styled.TouchableOpacity`
    width: 60%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryRed};
    padding: ${scale(12)}px;
    border-radius: ${scale(28)}px;
    margin-top: ${scale(18)}px;

    ${(props) =>
        props.disabled &&
        css`
            background-color: ${(props) => props.theme.primaryLightGray};
        `}
`;

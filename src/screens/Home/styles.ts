import DropDownPicker from "react-native-dropdown-picker";
import { RectButton } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import Modal from "react-native-modalbox";
import styled, { css } from "styled-components/native";

import { scale } from "../../utils/scalling";

interface OptionColorProps {
    color: string;
}

interface SpanProps {
    show: boolean;
}

interface FilterModalProps {
    ufOptionOpen: boolean;
}

export const StayNormalMap = styled(MapView)`
    flex: 1;
`;

export const FilterModal = styled(Modal)<FilterModalProps>`
    position: absolute;
    height: ${(props) => (props.ufOptionOpen ? scale(520) : scale(480))}px;
    width: ${scale(300)}px;
    margin-top: ${scale(50)}px;
    border-radius: ${scale(24)}px;
    background-color: ${(props) => props.theme.primaryWhite};
    elevation: 15;
    padding: ${scale(10)}px ${scale(28)}px;
`;

export const Span = styled.Text<SpanProps>`
    font-family: Trueno-Regular;
    font-size: ${scale(10)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    opacity: ${(props) => (props.show ? 1 : 0)};
`;

export const ButtonOptionContainer = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))`
    height: ${scale(24)}px;
    margin-bottom: ${scale(16)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Option = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const OptionCircleButton = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: ${scale(10)}px;
`;

export const ButtonOptionText = styled.Text`
    font-size: ${scale(16)}px;
    font-family: Trueno-Regular;
    color: ${(props) => props.theme.primaryBlack};
`;

export const OptionColor = styled.View<OptionColorProps>`
    background-color: ${(props) =>
        props.color ? props.color : props.theme.primaryBlack};
    border-radius: ${scale(30)}px;
    height: ${scale(15)}px;
    width: ${scale(15)}px;
    border: ${scale(1)}px ${(props) => props.theme.primaryDarkBlue};
`;

export const TabFilter = styled.View`
    flex-direction: row;
    margin-bottom: ${scale(10)}px;
`;

export const Tab = styled.View`
    height: ${scale(50)}px;
    border-bottom-color: ${(props) => props.theme.primaryRed};
    border-bottom-width: ${scale(2)}px;
    align-items: center;
    justify-content: center;
    margin-bottom: ${scale(10)}px;
`;

export const TabTitle = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${(props) => props.theme.primaryRed};
    include-font-padding: false;
`;

export const DropDownContainer = styled.View`
    width: 95%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${scale(5)}px;
`;

export const DropDownTitle = styled.Text`
    font-size: ${scale(15)}px;
    font-family: "Trueno-Regular";
    color: ${(props) =>
        props.theme.type === "dark"
            ? props.theme.primarySuperDarkBlue
            : props.theme.primaryLightBlue};
`;

export const UfDropDown = styled(DropDownPicker).attrs((props) => ({
    placeholder: "Selecionar",
    containerStyle: {
        height: scale(42),
        width: "30%",
    },
    dropDownStyle: {
        backgroundColor: props.theme.primaryWhite,
        borderTopLeftRadius: scale(15),
        borderTopRightRadius: scale(15),
        borderBottomLeftRadius: scale(15),
        borderBottomRightRadius: scale(15),
    },
    labelStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(16),
        textAlign: "center",
        color: props.theme.primaryDarkBlue,
    },
    activeLabelStyle: {
        color: props.theme.primaryDarkBlue,
        fontSize: scale(17),
        fontFamily: "Trueno-SemiBold",
    },
    arrowColor: props.theme.primaryRed,
    arrowSize: 18,
}))`
    border: 0;
    background-color: ${(props) => props.theme.primaryWhite};
`;

export const MapButtonsContainer = styled.View`
    flex: 0;
    height: ${scale(40)}px;
    width: ${scale(200)}px;
    position: absolute;
    bottom: 6%;
    align-self: center;
    flex-direction: row;
    border-radius: ${scale(20)}px;
    overflow: hidden;
    justify-content: space-between;
`;

export const MapButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.6,
})`
    width: 49.5%;
    background-color: ${(props) =>
        props.theme.type === "dark"
            ? props.theme.primaryLightBlue
            : props.theme.primaryRed};
    justify-content: center;
    align-items: center;

    ${(props) =>
        !props.disabled &&
        css`
            opacity: 0.6;
        `}
`;

export const MapText = styled.Text`
    font-size: ${scale(14)}px;
    font-family: Trueno-Regular;
    color: ${(props) =>
        props.theme.type === "dark"
            ? props.theme.primaryGray
            : props.theme.primaryWhite};
    text-align: center;
`;

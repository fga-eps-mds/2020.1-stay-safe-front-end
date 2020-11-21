import { RectButton } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import Modal from "react-native-modalbox";
import styled from "styled-components/native";

import { DropDown } from "../../components/Dropdown";
import { scale } from "../../utils/scalling";

interface TabProps {
    focus: boolean;
}

interface TabTitleProps {
    focus: boolean;
}

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

export const FilterButton = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))`
    position: absolute;
    width: ${scale(50)}px;
    height: ${scale(50)}px;
    align-items: center;
    justify-content: center;
    top: 8%;
    right: 6%;
    background-color: ${(props) => props.theme.primaryWhite};
    z-index: 6;
    elevation: 15;
    border-radius: ${scale(50)}px;
`;

export const HeatInfo = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))`
    position: absolute;
    width: ${scale(50)}px;
    height: ${scale(50)}px;
    align-items: center;
    justify-content: center;
    bottom: 8%;
    right: 6%;
    background-color: ${(props) => props.theme.primaryWhite};
    z-index: 6;
    elevation: 15;
    border-radius: ${scale(50)}px;
`;

export const FilterModal = styled(Modal)<FilterModalProps>`
    position: absolute;
    height: ${(props) => (props.ufOptionOpen ? scale(520) : scale(480))}px;
    width: ${scale(300)}px;
    margin-top: ${scale(50)}px;
    border-radius: ${scale(24)}px;
    background-color: ${(props) => props.theme.primaryWhite};
    elevation: 15;
    padding: ${scale(20)}px ${scale(28)}px;
`;

export const Span = styled.Text<SpanProps>`
    font-family: Trueno-Regular;
    font-size: ${scale(10)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    opacity: ${(props) => (props.show ? 1 : 0)};
`;

export const ButtonOptionContainer = styled.View`
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

export const OptionCircleButton = styled(RectButton).attrs((props) => ({
    activeOpacity: 0.6,
    rippleColor: props.theme.primaryGray,
}))`
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

export const Tab = styled.TouchableOpacity<TabProps>`
    border-bottom-color: ${(props) =>
        props.focus === true
            ? props.theme.primaryRed
            : props.theme.primaryDarkBlue};
    border-bottom-width: ${scale(2)}px;

    height: ${scale(50)}px;
    align-items: center;
    justify-content: center;
    width: 50%;
`;

export const TabTitle = styled.Text<TabTitleProps>`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${(props) =>
        props.focus === true
            ? props.theme.primaryRed
            : props.theme.primaryDarkBlue};
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

export const UfDropDown = styled(DropDown).attrs((props) => ({
    containerStyle: {
        height: scale(42),
        width: "30%",
    },
}))`
    background-color: ${(props) => props.theme.primaryWhite};
`;

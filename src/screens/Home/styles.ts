import MapView from "react-native-maps";
import Modal from "react-native-modalbox";
import styled from "styled-components/native";

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

export const StayNormalMap = styled(MapView)`
    flex: 1;
`;

export const FilterButton = styled.TouchableOpacity`
    position: absolute;
    width: ${scale(50)}px;
    height: ${scale(50)}px;
    align-items: center;
    justify-content: center;
    top: 8%;
    right: 7%;
    background-color: ${(props) => props.theme.primaryWhite};
    z-index: 6;
    border-radius: ${scale(50)}px;
`;

export const FilterModal = styled(Modal)`
    position: absolute;
    height: ${scale(465)}px;
    width: ${scale(300)}px;
    margin-top: ${scale(50)}px;
    border-radius: ${scale(24)}px;
    background-color: ${(props) => props.theme.primaryWhite};
    padding-horizontal: ${scale(28)}px;
    padding-vertical: ${scale(20)}px;
`;

export const Span = styled.Text<SpanProps>`
    font-family: Trueno-Regular;
    font-size: ${scale(10)}px;
    color: ${(props) => props.theme.primaryRed};
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

export const OptionCircleButton = styled.TouchableOpacity`
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
`;

export const Tab = styled.TouchableOpacity<TabProps>`
    border-bottom-color: ${(props) =>
        props.focus === true
            ? props.theme.primaryRed
            : props.theme.primaryDarkBlue};
    border-bottom-width: ${scale(2)}px;
    margin-bottom: ${scale(20)}px;
    height: ${scale(50)}px;
    align-items: center;
    justify-content: center;
    width: 32%;
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

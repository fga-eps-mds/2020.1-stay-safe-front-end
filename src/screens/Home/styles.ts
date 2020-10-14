import MapView from "react-native-maps";
import Modal from "react-native-modalbox";
import styled from "styled-components/native";

import { scale } from "../../utils/scalling";

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
    background-color: #ffffff;
    z-index: 6;
    border-radius: ${scale(50)}px;
`;

export const FilterModal = styled(Modal)`
    position: absolute;
    height: ${scale(375)}px;
    width: ${scale(300)}px;
    margin-top: ${scale(50)}px;
    border-radius: ${scale(24)}px;
    padding-horizontal: ${scale(28)}px;
    padding-vertical: ${scale(20)}px;
`;

export const FilterTitle = styled.Text`
    font-size: ${scale(20)}px;
    font-family: Trueno-SemiBold;
    margin-bottom: ${scale(15)}px;
`;

export const ButtonOptionContainer = styled.View`
    height: ${scale(24)}px;
    margin-bottom: ${scale(16)}px;
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
`;

export const TabFilter = styled.View`
    flex-direction: row;
    elevation: 1;
`;

export const Tab = styled.TouchableOpacity`
    border-bottom-color: ${props => props.focus === true ? '#e83338' : '#011640'};
    border-bottom-width: ${scale(2)}px;
    margin-bottom: ${scale(20)}px;
    height: ${scale(50)}px;
    align-items: center;
    justify-content: center;
    width: 32%;
`;

export const TabTitle = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: ${props => props.focus === true ? '#e83338' : '#011640'};
    include-font-padding: false;
`;
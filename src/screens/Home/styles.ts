import styled from "styled-components/native";
import MapView from "react-native-maps";

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
    z-index: 5;
    border-radius: ${scale(50)}px;
`;

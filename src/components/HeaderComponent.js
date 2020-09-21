import styled from 'styled-components/native'

import { scale } from '../utils/scalling'

export const Header = styled.View`
    width: 80%;
    max-height: 100px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    width: 90%;
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: #E83338;
    text-align: center;
`;

export const HeaderBackScreen = styled.TouchableOpacity.attrs({
  activeOpacity: 0.2,
})`
    width: 10%;
    padding-vertical: ${scale(8)}px;
    margin-left: -${scale(8)}px
`;
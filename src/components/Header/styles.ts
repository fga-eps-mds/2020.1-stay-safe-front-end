import styled from 'styled-components/native'

import { scale } from '../../utils/scalling'

export const HeaderContainer = styled.View`
    width: 100%;
    height: ${scale(60)}px;
    flex-direction: row;
    align-self: center;
`

export const HeaderWrapper = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
`

export const HeaderTitle = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(16)}px;
    color: #E83338;
    text-align: center;
`

export const HeaderBackScreen = styled.View`
    left: 10%;
    position: absolute;
`
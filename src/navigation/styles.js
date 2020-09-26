import styled from 'styled-components/native'

import { scale } from '../utils/scalling'

export const AlertButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    background-color: #E83338;
    border-radius: ${scale(28)}px;
    padding: ${scale(8)}px;
`;
import styled from 'styled-components/native'

import { scale } from "../../utils/scalling"

export const CardContainer = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: space-between;
`;

export const Card = styled.View`
    background-color: #ffffff;
    border-radius: ${scale(16)}px;
    margin-bottom: ${scale(20)}px;
    padding: ${scale(8)}px;
`;
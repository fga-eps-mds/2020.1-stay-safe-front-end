import styled from 'styled-components';

import { scale } from '../../utils/scalling';

export const HeaderTitleContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  max-height: ${scale(100)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  /* background-color: #000000; */
  font-size: ${scale(16)}px;
  font-weight: bold;
  color: #E83338;
  line-height: ${scale(20)}px;
`;
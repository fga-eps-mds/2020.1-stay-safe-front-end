import styled from 'styled-components';

import { scale } from '../../utils/scalling';

export const HeaderTitleContainer = styled.View`
  width: 100%;
  height: 100%;
  max-height: ${scale(30)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const Title = styled.Text`
  font-size: ${scale(16)}px;
  color: #E83338;
  line-height: ${scale(20)}px;
  font-family: Trueno-SemiBold;
`;
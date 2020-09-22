import styled from 'styled-components/native';

import { 
  NormalLabel, 
  NormalInput,
  NormalSend
} from '../../components/NormalForms';

import { scale } from '../../utils/scalling';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #F0F0F5;
`;

export const LogoWrapper = styled.View`
  margin-top: ${scale(35)}px;
  justify-content: center;
  align-items: center;
`;

export const LabelsContainer = styled.View`
  height: 100%;
  padding: ${scale(35)}px ${scale(25)}px;
`;

export const LabelViewing = styled(NormalLabel)`
  margin-left: ${scale(10)}px;
`;

export const InputViewing = styled(NormalInput)`
  width: 100%;
  background-color: #FFFFFF;
  height: ${scale(40)}px;
`;

export const EditButton = styled(NormalSend)`
  width: 100%;
`;

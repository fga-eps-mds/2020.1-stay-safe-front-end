import styled from 'styled-components';

import { NormalSend, SendLabel } from '../../components/NormalForms';

import { scale } from '../../utils/scalling';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #F0F0F5;
`;

export const ButtonsContainer = styled.View`
  padding: ${scale(43)}px ${scale(25)}px;
`;

export const Button = styled.TouchableOpacity`
  padding: ${scale(15)}px;
  background-color: #FFFFFF;
  border-radius: ${scale(12)}px;
  flex-direction: row;
  margin-bottom: ${scale(17)}px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: ${scale(14)}px;
  color: #011640;
  font-family: Trueno-SemiBold;
  margin-left: ${scale(10)}px;
`;

export const UserButtonsContainer = styled.View`
  padding: ${scale(30)}px ${scale(110)}px;
  justify-content: center;
  align-items: center;
`;

export const LogoutButton = styled(NormalSend)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-top: ${scale(28)}px;
`;

export const DeleteText = styled(SendLabel)`
  color: rgba(0, 0, 0, 0.3);
`; 
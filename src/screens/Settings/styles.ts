import styled from "styled-components";

import { NormalSend, SendLabel } from "../../components/NormalForms";
import Modal from "react-native-modalbox";

import { scale } from "../../utils/scalling";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f0f0f5;
`;

export const ButtonsContainer = styled.View`
  padding: ${scale(43)}px ${scale(25)}px;
`;

export const Button = styled.TouchableOpacity`
  padding: ${scale(15)}px;
  background-color: #ffffff;
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
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-top: ${scale(28)}px;
`;

export const DeleteText = styled(SendLabel)`
  color: rgba(0, 0, 0, 0.3);
`;

export const ModalDelete = styled(Modal)`
  width: ${scale(230)}px;
  height: ${scale(200)}px;
  border-radius: ${scale(10)}px;
  border: ${scale(2)}px #7dbfe2;
  padding: ${scale(10)}px ${scale(20)}px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const ModalText = styled.Text`
  font-size: ${scale(14)}px;
  color: #011640;
  font-family: Trueno-SemiBold;
  text-align: center;
`;

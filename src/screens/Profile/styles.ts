import styled from "styled-components/native";

import {
  NormalLabel,
  NormalInput,
  NormalSend,
} from "../../components/NormalForms";

import { scale } from "../../utils/scalling";

interface InputViewingProps {
  isEditing?: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #f0f0f5;
`;

export const LogoWrapper = styled.View`
  margin-top: ${scale(35)}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const CanEditButton = styled(NormalSend)`
  width: 50%;
  margin: 0;
  background-color: #011640;
`;

export const LabelsContainer = styled.View`
  height: 100%;
  padding: ${scale(35)}px ${scale(25)}px;
`;

export const LabelViewing = styled(NormalLabel)`
  margin-left: ${scale(10)}px;
`;

export const InputViewing = styled(NormalInput)<InputViewingProps>`
  width: 100%;
  background-color: ${(props) => (props.isEditing ? "#ffffff" : "#C8C8C8")};
  border: ${(props) => (props.isEditing ? scale(1) : scale(0))}px #7dbfe2;
  height: ${scale(40)}px;
`;

export const EditButton = styled(NormalSend)`
  width: 100%;
`;

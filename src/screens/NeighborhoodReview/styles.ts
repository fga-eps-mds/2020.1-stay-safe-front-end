import styled from "styled-components/native";
import { scale } from "../../utils/scalling";

export const NeighborhoodTitle = styled.Text`
  font-size: ${scale(16)}px;
  font-family: "Trueno-Regular";
  color: ${(props) => props.theme.primarySuperDarkBlue};
  text-align: center;
`;

export const NeighborhoodContainer = styled.View`
    background-color: ${(props) => props.theme.primaryWhite};
    width: 90%;
    height: ${scale(50)}px;
    margin-top: ${scale(20)}px;
    padding-left: ${scale(20)}px;
    padding-right: ${scale(12)}px;
    padding-top: ${scale(2)}px;
    padding-bottom: ${scale(2)}px;
    border-radius: ${scale(20)}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
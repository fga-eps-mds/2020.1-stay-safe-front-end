import styled from "styled-components/native";
import { scale } from "../../utils/scalling";

export const NeighborhoodTitle = styled.Text`
  font-size: ${scale(16)}px;
  font-family: "Trueno-Regular";
  color: ${(props) => props.theme.primarySuperDarkBlue};
  text-align: center;
`;

export const NeighborhoodText = styled.Text`
  font-size: ${scale(12)}px;
  font-family: "Trueno-Regular";
  color: ${(props) => props.theme.primarySuperDarkBlue};
  text-align: center;
  padding-top: ${scale(10)}px;

`;

export const NeighborhoodContainer = styled.View`
    background-color: ${(props) => props.theme.primaryWhite};
    width: 75%;
    height: ${scale(40)}px;
    margin-top: ${scale(20)}px;
    padding-left: ${scale(20)}px;
    padding-right: ${scale(12)}px;
    padding-top: ${scale(2)}px;
    padding-bottom: ${scale(10)}px;
    border-radius: ${scale(20)}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const StarContainer = styled.View`
    padding-top: ${scale(50)}px;
    border-bottom-width: ${scale(2)}px;
    padding-bottom: ${scale(10)}px;
    align-items: center;
    width: 100%;
`;

export const ColorsContainer = styled.View`
    padding-top: ${scale(65)}px;
    align-items: center;
    width: 100%;
    padding-bottom: ${scale(20)}px;
`;

export const ColorsContainerChild = styled.View`
    align-items: center;
    width: 100%;
    padding-bottom: ${scale(20)}px;
`;

export const StatisticsNeighborhoodCard = styled.View`
    width: 100%;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(20)}px;
    align-items: center;
`;

export const StatisticsNeighborhood = styled.View`
    width: 90%;
    height: ${scale(50)}px;
    margin-top: ${scale(15)}px;
    padding-left: ${scale(300)}px;
    padding-right: ${scale(20)}px;
    flex-direction: column;
`;
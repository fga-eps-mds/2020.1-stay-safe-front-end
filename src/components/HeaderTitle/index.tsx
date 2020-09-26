import React from "react";
import { Feather } from '@expo/vector-icons';

import { HeaderTitleContainer, Title, GoBackContainer } from "./styles";

import { scale } from '../../utils/scalling';
import { useNavigation } from "@react-navigation/native";

interface HeaderTitleProps {
  text: string;
  goBack?: boolean;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ text, goBack=false }) => {
  const navigation = useNavigation();
  
  return (
    <HeaderTitleContainer>
      {goBack && (
        <GoBackContainer>
          <Feather
            onPress={() => navigation.goBack()}
            name='arrow-left' 
            size={scale(28)} 
            color='#010A26'
          />
        </GoBackContainer>
      )}
      <Title>{text}</Title>
    </HeaderTitleContainer>
  );
};

export default HeaderTitle;

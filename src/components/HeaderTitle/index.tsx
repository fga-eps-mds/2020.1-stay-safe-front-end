import React from 'react';
import { Text } from 'react-native';

import { HeaderTitleContainer, Title } from './styles';

interface HeaderTitleProps {
  text?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ text }) => {
  return (
    <HeaderTitleContainer>
      <Title>{text}</Title>
    </HeaderTitleContainer>
  );
}

export default HeaderTitle;
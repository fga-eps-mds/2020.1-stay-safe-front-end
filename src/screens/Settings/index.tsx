import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Title } from '../../components/NormalForms';

import HeaderTitle from '../../components/HeaderTitle';

import { Container, ButtonsContainer } from './styles';

const Settings: React.FC = () => {
  return (
    <Container>
      <HeaderTitle text="Configurações" />
      <ButtonsContainer>

      </ButtonsContainer>
    </Container>
  );
}

export default Settings;
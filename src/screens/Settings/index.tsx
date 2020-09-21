import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';

import { NormalSend, SendLabel } from '../../components/NormalForms';
import HeaderTitle from '../../components/HeaderTitle';

import { 
  Container, 
  ButtonsContainer, 
  Button, 
  ButtonText, 
  LogoutButton,
  UserButtonsContainer,
  DeleteButton,
  DeleteText
} from './styles';

import { scale } from '../../utils/scalling';
import { buttonsObject } from './buttonsObject';

interface ButtonObject {
  title: string;
  icon: string;
}

const Settings: React.FC = () => {
  const [loaded] = Font.useFonts({
    'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
    'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
  })

  if(!loaded) 
    return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <HeaderTitle text="Configurações" />
        <ButtonsContainer>
          {buttonsObject.map((button: ButtonObject) => {
            return (
              <Button key={button.title} >
                <Feather name={button.icon} size={scale(20)} color="#010A26" />
                <ButtonText>{button.title}</ButtonText>
              </Button>
            );
          })}
        </ButtonsContainer>
        <UserButtonsContainer>
          <LogoutButton onPress={() => {}}>
            <Feather name="log-out" size={scale(20)} color="#FFFFFF" />
            <SendLabel>Sair</SendLabel>
          </LogoutButton>
          <DeleteButton>
            <DeleteText>Excluir conta</DeleteText>
          </DeleteButton>
        </UserButtonsContainer>
      </Container>
    </SafeAreaView>
  );
}

export default Settings;
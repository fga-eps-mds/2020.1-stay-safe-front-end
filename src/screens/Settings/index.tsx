import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

import AsyncStorage from '@react-native-community/async-storage'
import { deleteUser } from '../../services/users';

import { scale } from '../../utils/scalling';
import { buttonsObject } from './buttonsObject';

interface ButtonObject {
  title: string;
  icon: string;
}

const Settings: React.FC = () => {
  const navigation = useNavigation();

  const [loaded] = Font.useFonts({
    'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
    'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
  })

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken');
    navigation.navigate('Home');
  };

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem("userToken");
    AsyncStorage.removeItem('userToken');

    await deleteUser(token);

    navigation.navigate('Home');
  };

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
          <LogoutButton onPress={() => handleLogout()}>
            <Feather name="log-out" size={scale(20)} color="#FFFFFF" />
            <SendLabel>Sair</SendLabel>
          </LogoutButton>
          <DeleteButton onPress={() => handleDeleteAccount()} >
            <DeleteText>Excluir conta</DeleteText>
          </DeleteButton>
        </UserButtonsContainer>
      </Container>
    </SafeAreaView>
  );
}

export default Settings;
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Alert, SafeAreaView, Text } from 'react-native';

import { 
  Container, 
  InputViewing,
  LabelsContainer, 
  LabelViewing, 
  LogoWrapper,
  EditButton
} from './styles';
import HeaderTitle from '../../components/HeaderTitle';
import { KeyboardScrollView, SendLabel } from '../../components/NormalForms';

import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from '../../services/users';

import Logo from '../../img/logo.svg';

import { scale } from '../../utils/scalling';

const Profile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userConfirmPwd, setUserConfirmPwd] = useState("");
  
  const [loaded] = Font.useFonts({
    'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
    'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
  });
 
  useEffect(() => {
    AsyncStorage.getItem('username').then(username => {
      getUser(username).then(response => {
        if(response.status === 200) {
          setUsername(response.body.username);
          setUserFullName(response.body.full_name);
          setUserEmail(response.body.email);
        } else {
          Alert.alert('Erro ao Visualizar usuário.');
        }
      });
    });
  }, []);

  if(!loaded)
    return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardScrollView>
        <Container>
          <HeaderTitle text="Perfil" />
          <LogoWrapper>
            <Logo width={scale(100)} height={scale(100)} />
          </LogoWrapper>
          <LabelsContainer>
            <LabelViewing>Username</LabelViewing>
            <InputViewing
              value={username}
              onChange={text => setUsername(text)}
            />
            <LabelViewing>Nome Completo</LabelViewing>
            <InputViewing 
              value={userFullName} 
              onChange={text => setUserFullName(text)} 
            />
            <LabelViewing>Email</LabelViewing>
            <InputViewing
              value={userEmail}
              onChange={text => setUserEmail(text)}
           />
            <LabelViewing>Senha</LabelViewing>
            <InputViewing 
              value={userPwd}
              onChange={text => setUserPwd(text)}
            />
            <LabelViewing>Confirmar senha</LabelViewing>
            <InputViewing 
              value={userConfirmPwd}
              onChange={text => setUserConfirmPwd(text)}
            />
            <EditButton>
              <SendLabel>Salvar</SendLabel>
            </EditButton>
          </LabelsContainer>
        </Container>
      </KeyboardScrollView>
    </SafeAreaView>
  );
}

export default Profile;
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Alert, SafeAreaView, Text } from "react-native";

import {
  Container,
  InputViewing,
  LabelsContainer,
  LabelViewing,
  LogoWrapper,
  EditButton,
} from "./styles";
import HeaderTitle from "../../components/HeaderTitle";
import { KeyboardScrollView, SendLabel } from "../../components/NormalForms";

import AsyncStorage from "@react-native-community/async-storage";
import { getUser, updateUser, authUser } from "../../services/users";

import Logo from "../../img/logo.svg";

import { validateUser } from "../../utils/validateUser";
import { scale } from "../../utils/scalling";

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userConfirmPwd, setUserConfirmPwd] = useState("");

  const [loaded] = Font.useFonts({
    "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
    "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
  });

  useEffect(() => {
    AsyncStorage.getItem("username").then((username) => {
      getUser(username).then((response) => {
        if (response.status === 200) {
          setUsername(response.body.username);
          setUserFullName(response.body.full_name);
          setUserEmail(response.body.email);
        } else {
          Alert.alert("Erro ao visualizar usuário.");
        }
      });
    });
  }, []);

  const handleUpdateProfile = async () => {
    if (
      validateUser({
        fullName: userFullName,
        username: username,
        email: userEmail,
        password: userPwd,
        confirmPassword: userConfirmPwd,
      })
    ) {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      const response = await updateUser(
        {
          full_name: userFullName,
          username: username,
          email: userEmail,
          password: userPwd,
        },
        token
      );

      if (!response.body.error && response.status === 200) {
        Alert.alert("Usuário atualizado com sucesso!");
      } else {
        Alert.alert("Erro ao atualizar usuário", response.body.error);
      }
    }
  };

  if (!loaded) return null;

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
              editable={false}
              returnKeyType="next"
              maxLength={20}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <LabelViewing>Nome Completo</LabelViewing>
            <InputViewing
              returnKeyType="next"
              maxLength={200}
              value={userFullName}
              onChangeText={(text) => setUserFullName(text)}
            />
            <LabelViewing>Email</LabelViewing>
            <InputViewing
              returnKeyType="next"
              keyboardType="email-address"
              maxLength={50}
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
            />
            <LabelViewing>Senha</LabelViewing>
            <InputViewing
              returnKeyType="next"
              secureTextEntry={true}
              maxLength={20}
              value={userPwd}
              onChangeText={(text) => setUserPwd(text)}
            />
            <LabelViewing>Confirmar senha</LabelViewing>
            <InputViewing
              secureTextEntry={true}
              maxLength={20}
              value={userConfirmPwd}
              onChangeText={(text) => setUserConfirmPwd(text)}
            />
            <EditButton onPress={handleUpdateProfile}>
              <SendLabel>Salvar</SendLabel>
            </EditButton>
          </LabelsContainer>
        </Container>
      </KeyboardScrollView>
    </SafeAreaView>
  );
};

export default Profile;

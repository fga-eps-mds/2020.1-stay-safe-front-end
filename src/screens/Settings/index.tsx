import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { SendLabel } from "../../components/NormalForms";
import HeaderTitle from "../../components/HeaderTitle";

import {
  Container,
  ButtonsContainer,
  Button,
  ButtonText,
  LogoutButton,
  UserButtonsContainer,
  DeleteButton,
  DeleteText,
  ModalStayAlert,
} from "./styles";

import AsyncStorage from "@react-native-community/async-storage";
import { deleteUser, getUser } from "../../services/users";

import { scale } from "../../utils/scalling";
import { buttonsObject } from "./buttonsObject";

interface ButtonObject {
  title: string;
  icon: string;
  userLogged: boolean;
}

const Settings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  const [isLogged, setIsLogged] = useState(false);

  const [loaded] = Font.useFonts({
    "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
    "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
  });

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("username").then((username) => {
        getUser(username).then((response) => {
          if (response.status === 200) {
            setIsLogged(true);
          } else {
            setIsLogged(false);
          }
        });
      });
    }, [])
  );

  const handleLogout = () => {
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("username");
    navigation.navigate("Home");
  };

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem("userToken");
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("username");

    await deleteUser(token);

    navigation.navigate("Home");
  };

  if (!loaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f5' }}>
      <HeaderTitle text="Configurações" />
      <Container>
        <ButtonsContainer>
          {buttonsObject.map((button: ButtonObject) => {
            return button.userLogged ? (
              isLogged && (
                <Button key={button.title}>
                  <Feather
                    name={button.icon}
                    size={scale(20)}
                    color="#010A26"
                  />
                  <ButtonText>{button.title}</ButtonText>
                </Button>
              )
            ) : (
              <Button key={button.title}>
                <Feather name={button.icon} size={scale(20)} color="#010A26" />
                <ButtonText>{button.title}</ButtonText>
              </Button>
            );
          })}
        </ButtonsContainer>
        {isLogged && (
          <UserButtonsContainer>
            <LogoutButton onPress={() => handleLogout()}>
              <Feather name="log-out" size={scale(20)} color="#FFFFFF" />
              <SendLabel>Sair</SendLabel>
            </LogoutButton>
            <DeleteButton onPress={() => setIsModalOpen(true)}>
              <DeleteText>Excluir conta</DeleteText>
            </DeleteButton>
          </UserButtonsContainer>
        )}
        <ModalStayAlert
          show={isModalOpen}
          title="Excluir conta"
          message="Tem certeza que deseja excluir sua conta?"
          showConfirmButton={true}
          confirmText="Excluir"
          onConfirmPressed={() => {
            setIsModalOpen(false);
            handleDeleteAccount();
          }}
          showCancelButton={true}
          cancelText="Voltar"
          onCancelPressed={() => {
            setIsModalOpen(false);
          }}
          onDismiss={() => setIsModalOpen(false)}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Settings;

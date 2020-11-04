import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import {
    SendLabel,
    Container,
    KeyboardScrollView,
} from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import { deleteUser } from "../../services/users";
import { scale } from "../../utils/scalling";
import { buttonsObject } from "./buttonsObject";
import {
    ButtonsContainer,
    Button,
    ButtonText,
    LogoutButton,
    UserButtonsContainer,
    DeleteButton,
    DeleteText,
} from "./styles";

interface ButtonObject {
    title: string;
    icon: string;
    userLogged: boolean;
}

const Settings: React.FC = () => {
    const { switchTheme, data, signOut, deleteAccount } = useUser();
    const theme = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const handleLogout = async () => {
        setIsLoading(true);

        await signOut();

        setIsLoading(false);
        navigation.navigate("Home");
    };

    const handleDeleteAccount = async () => {
        setIsLoading(true);

        await deleteAccount();

        setIsLoading(false);
        navigation.navigate("Home");
    };

    if (!loaded) return null;

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.primaryBackground }}
        >
            <Container>
                <HeaderTitle text="Configurações" />
                <KeyboardScrollView>
                    <ButtonsContainer>
                        {buttonsObject.map((button: ButtonObject) => {
                            return button.userLogged ? (
                                data.token !== "" && (
                                    <Button key={button.title}>
                                        <Feather
                                            name={button.icon}
                                            size={scale(20)}
                                            color={theme.primarySuperDarkBlue}
                                        />
                                        <ButtonText>{button.title}</ButtonText>
                                    </Button>
                                )
                            ) : (
                                <Button key={button.title}>
                                    <Feather
                                        name={button.icon}
                                        size={scale(20)}
                                        color={theme.primarySuperDarkBlue}
                                    />
                                    <ButtonText>{button.title}</ButtonText>
                                </Button>
                            );
                        })}
                        <Button onPress={switchTheme}>
                            <Feather
                                name={theme.type === "dark" ? "sun" : "moon"}
                                size={scale(20)}
                                color={theme.primarySuperDarkBlue}
                            />
                            <ButtonText>
                                {theme.type === "dark"
                                    ? "Modo Claro"
                                    : "Modo Escuro"}
                            </ButtonText>
                        </Button>
                    </ButtonsContainer>

                    {data.token !== "" && (
                        <UserButtonsContainer>
                            <LogoutButton onPress={() => handleLogout()}>
                                <>
                                    <Feather
                                        name="log-out"
                                        size={scale(20)}
                                        color={theme.primaryWhite}
                                    />
                                    <SendLabel>Sair</SendLabel>
                                </>
                            </LogoutButton>
                            <DeleteButton onPress={() => setIsModalOpen(true)}>
                                <DeleteText>Excluir conta</DeleteText>
                            </DeleteButton>
                        </UserButtonsContainer>
                    )}

                    <StayAlert
                        show={isModalOpen}
                        title="Excluir conta"
                        message="Tem certeza que deseja excluir sua conta?"
                        showConfirmButton
                        confirmText="Excluir"
                        onConfirmPressed={() => {
                            setIsModalOpen(false);
                            handleDeleteAccount();
                        }}
                        showCancelButton
                        cancelText="Voltar"
                        onCancelPressed={() => {
                            setIsModalOpen(false);
                        }}
                        onDismiss={() => setIsModalOpen(false)}
                    />
                    {isLoading && <Loader />}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Settings;

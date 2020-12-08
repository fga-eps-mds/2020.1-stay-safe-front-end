import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import {
    ButtonWithIconLabel,
    Container,
    KeyboardScrollView,
} from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import { scale } from "../../utils/scalling";
import { buttonsObject } from "./buttonsObject";
import {
    ButtonsContainer,
    ButtonText,
    DeleteButton,
    DeleteText,
} from "./styles";

interface ButtonObject {
    title: string;
    icon: string;
    userLogged: boolean;
    screen: string | null;
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

        try {
            await signOut();
        } catch (e) {
            console.warn(e);
        } finally {
            setIsLoading(false);
        }

        navigation.navigate("Home");
    };

    const handleDeleteAccount = async () => {
        setIsLoading(true);

        try {
            await deleteAccount();
        } catch (e) {
            console.warn(e);
        } finally {
            setIsLoading(false);
        }

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
                                    <Button
                                        key={button.title}
                                        width="100%"
                                        color={theme.primaryWhite}
                                        onPress={() => button.screen ?
                                            navigation.navigate(button.screen) : null
                                        }
                                        settings
                                    >
                                        <Feather
                                            name={button.icon}
                                            size={scale(18)}
                                            color={theme.primarySuperDarkBlue}
                                        />
                                        <ButtonText>{button.title}</ButtonText>
                                    </Button>
                                )
                            ) : (
                                <Button
                                    key={button.title}
                                    width="100%"
                                    color={theme.primaryWhite}
                                    onPress={() => button.screen ?
                                        navigation.navigate(button.screen) : null
                                    }
                                    settings
                                >
                                    <Feather
                                        name={button.icon}
                                        size={scale(18)}
                                        color={theme.primarySuperDarkBlue}
                                    />
                                    <ButtonText>{button.title}</ButtonText>
                                </Button>
                            );
                        })}
                        <Button
                            onPress={switchTheme}
                            width="100%"
                            color={theme.primaryWhite}
                            settings
                        >
                            <Feather
                                name={theme.type === "dark" ? "sun" : "moon"}
                                size={scale(18)}
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
                        <>
                            <Button
                                onPress={() => handleLogout()}
                                width="30%"
                                color={theme.primaryRed}
                            >
                                <Feather
                                    name="log-out"
                                    size={scale(18)}
                                    color={theme.primaryWhite}
                                />
                                <ButtonWithIconLabel>Sair</ButtonWithIconLabel>
                            </Button>
                            <DeleteButton onPress={() => setIsModalOpen(true)}>
                                <DeleteText>Excluir conta</DeleteText>
                            </DeleteButton>
                        </>
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

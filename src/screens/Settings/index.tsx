import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";
import { Switch } from "react-native-paper";

import { updateUser, getUser } from "../../services/users";
import Button from "../../components/Button";
import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import {
    ButtonWithIconLabel,
    Container,
    KeyboardScrollView
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
}

const Settings: React.FC = () => {
    const { switchTheme, data, signOut, deleteAccount } = useUser();
    const theme = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);

    const [isSwitchOn, setIsSwitchOn] = useState(true);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useEffect(() => {
        const loadData = async () => {
            const response = await getUser(data.username);
            if (response.status === 200)
                setIsSwitchOn(response.body.show_notifications)
        }
        loadData();
    }, [])

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

    const handleNotification = async () => {
        const response = await updateUser({show_notifications: !isSwitchOn}, data.token);
        if (response.status === 200)
            setIsSwitchOn(!isSwitchOn);
    }

    if (!loaded) return null;

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.primaryBackground }}
        >
            <Container>
                <HeaderTitle text="Configurações" />
                <KeyboardScrollView>
                    <ButtonsContainer>
                        <View style={{flexDirection: "row", marginBottom: "0%"}}>
                            <Button
                                key={"Notificações"}
                                width="100%"
                                color={theme.primaryWhite}
                                settings
                                onPress={handleNotification}
                                >
                                <Feather
                                    name={"bell"}
                                    size={scale(18)}
                                    color={theme.primarySuperDarkBlue}
                                    />
                                <ButtonText>Notificações</ButtonText>
                                <Switch
                                    style={{ marginLeft: "10%" }}
                                    color={theme.primarySuperDarkBlue}
                                    value={isSwitchOn}
                                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                                />
                            </Button>
                        </View>
                        {buttonsObject.map((button: ButtonObject) => {
                            return button.userLogged ? (
                                data.token !== "" && (
                                    <Button
                                        key={button.title}
                                        width="100%"
                                        color={theme.primaryWhite}
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

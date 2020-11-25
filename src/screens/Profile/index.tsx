import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import HeaderTitle from "../../components/HeaderTitle";
import LogoContainer from "../../components/LogoContainer";
import {
    Container,
    KeyboardScrollView,
    NormalLabel,
    ButtonWithIconLabel,
} from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import { getUser, updateUser } from "../../services/users";
import { scale } from "../../utils/scalling";
import { validateUser } from "../../utils/validateUser";
import { profileButtons } from "./buttonsObject";
import { InputViewing, ButtonsContainer } from "./styles";

const Profile: React.FC = () => {
    const theme = useTheme();
    const { data } = useUser();

    const [username, setUsername] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userConfirmPwd, setUserConfirmPwd] = useState("");

    const navigation = useNavigation();

    const [isEditing, setIsEditing] = useState(false);
    const [isUserEdited, setIsUserEdited] = useState(false);

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<[string, string]>([
        "",
        "",
    ]);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useFocusEffect(
        useCallback(() => {
            if (data.username !== "" && data.token !== "") {
                getUser(data.username).then((response) => {
                    if (response.status === 200) {
                        setUsername(response.body.username);
                        setUserFullName(response.body.full_name);
                        setUserEmail(response.body.email);
                    } else {
                        setUsername("");
                        setUserFullName("");
                        setUserEmail("");
                        setUserPwd("");
                        setUserConfirmPwd("");
                    }
                });
            } else {
                setUsername("");
                setUserFullName("");
                setUserEmail("");
                setUserPwd("");
                setUserConfirmPwd("");
            }
        }, [data])
    );

    const handleUpdateProfile = async () => {
        const error = validateUser({
            fullName: userFullName,
            email: userEmail,
            password: userPwd,
            confirmPassword: userConfirmPwd,
        });

        if (error === "") {
            let editedUser;
            if (userPwd === null || userPwd === "") {
                editedUser = {
                    full_name: userFullName,
                    email: userEmail,
                };
            } else {
                editedUser = {
                    full_name: userFullName,
                    email: userEmail,
                    password: userPwd,
                };
            }

            if (data.token !== "") {
                const response = await updateUser(editedUser, data.token);

                if (!response.body.error && response.status === 200) {
                    setIsUserEdited(true);
                } else {
                    setHasError(true);
                    setErrorMessage([
                        "Erro ao atualizar usuário",
                        response.body.error,
                    ]);
                }
            }
        } else {
            setHasError(true);
            setErrorMessage(["Campo Inválido", error]);
        }
    };

    const handleClosedModal = () => {
        setIsUserEdited(false);
        setIsEditing(false);
    };

    if (!loaded) return null;

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.primaryBackground }}
        >
            <Container>
                <HeaderTitle
                    text="Perfil"
                    goBack={isEditing}
                    onPressGoBack={() => setIsEditing(false)}
                />

                <KeyboardScrollView>
                    <LogoContainer />

                    <NormalLabel>Username</NormalLabel>
                    <InputViewing
                        editable={false}
                        isEditing={false}
                        returnKeyType="next"
                        maxLength={20}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <NormalLabel>Nome Completo</NormalLabel>
                    <InputViewing
                        editable={isEditing}
                        isEditing={isEditing}
                        returnKeyType="next"
                        maxLength={200}
                        value={userFullName}
                        onChangeText={(text) => setUserFullName(text)}
                    />
                    <NormalLabel>Email</NormalLabel>
                    <InputViewing
                        editable={isEditing}
                        isEditing={isEditing}
                        returnKeyType="next"
                        keyboardType="email-address"
                        maxLength={50}
                        value={userEmail}
                        onChangeText={(text) => setUserEmail(text)}
                    />

                    {data.token !== "" && isEditing && (
                        <>
                            <NormalLabel>Senha</NormalLabel>
                            <InputViewing
                                isEditing={isEditing}
                                returnKeyType="next"
                                secureTextEntry
                                maxLength={20}
                                value={userPwd}
                                onChangeText={(text) => setUserPwd(text)}
                            />
                            <NormalLabel>Confirmar senha</NormalLabel>
                            <InputViewing
                                isEditing={isEditing}
                                secureTextEntry
                                maxLength={20}
                                value={userConfirmPwd}
                                onChangeText={(text) => setUserConfirmPwd(text)}
                            />
                        </>
                    )}

                    {data.token !== "" && (
                        <Button
                            isEditing={isEditing}
                            color={theme.primaryRed}
                            width="45%"
                            onPress={
                                isEditing
                                    ? () => handleUpdateProfile()
                                    : () => setIsEditing(true)
                            }
                        >
                            <Feather
                                name={isEditing ? "save" : "edit-3"}
                                size={scale(18)}
                                color={theme.primaryWhite}
                            />
                            <ButtonWithIconLabel>
                                {isEditing ? "Salvar" : "Editar Perfil"}
                            </ButtonWithIconLabel>
                        </Button>
                    )}

                    {data.token !== "" && !isEditing && (
                        <ButtonsContainer>
                            {profileButtons.map((button) => {
                                return (
                                    <Button
                                        key={button.label}
                                        width="70%"
                                        color={theme.primaryDarkBlue}
                                        onPress={() =>
                                            navigation.navigate(
                                                button.navigation
                                            )
                                        }
                                    >
                                        <Feather
                                            name={button.icon}
                                            size={scale(18)}
                                            color={theme.primaryWhite}
                                        />
                                        <ButtonWithIconLabel>
                                            {button.label}
                                        </ButtonWithIconLabel>
                                    </Button>
                                );
                            })}
                        </ButtonsContainer>
                    )}

                    <StayAlert
                        show={isUserEdited}
                        title="Editar Perfil"
                        message="Usuário atualizado com sucesso!"
                        showConfirmButton
                        confirmText="Entendido"
                        onConfirmPressed={() => handleClosedModal()}
                        onDismiss={() => handleClosedModal()}
                    />
                    <StayAlert
                        show={hasError}
                        title={errorMessage[0]}
                        message={errorMessage[1]}
                        showConfirmButton
                        confirmText="Confirmar"
                        onConfirmPressed={() => setHasError(false)}
                        onDismiss={() => setHasError(false)}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Profile;

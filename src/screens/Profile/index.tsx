import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import {
    useFocusEffect,
    useNavigation,
    useIsFocused,
} from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import LoggedInModal from "../../components/LoggedInModal";
import {
    Container,
    KeyboardScrollView,
    LogoWrapper,
    NormalLabel,
} from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import Logo from "../../img/logo.svg";
import { getUser, updateUser } from "../../services/users";
import { scale } from "../../utils/scalling";
import { validateUpdateUser } from "../../utils/validateUpdateUser";
import {
    InputViewing,
    ProfileButton,
    EditButton,
    ButtonLabel,
    ButtonsContainer,
} from "./styles";

const Profile: React.FC = () => {
    const theme = useTheme();

    const [username, setUsername] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userConfirmPwd, setUserConfirmPwd] = useState("");

    const isFocused = useIsFocused();

    const [isLogged, setIsLogged] = useState(false);

    const navigation = useNavigation();

    const [isEditing, setIsEditing] = useState(false);
    const [isUserEdited, setIsUserEdited] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem("username").then((username) => {
                if (username !== null) {
                    getUser(username).then((response) => {
                        if (response.status === 200) {
                            setUsername(response.body.username);
                            setUserFullName(response.body.full_name);
                            setUserEmail(response.body.email);
                            setIsLogged(true);
                        } else {
                            setUsername("");
                            setUserFullName("");
                            setUserEmail("");
                            setUserPwd("");
                            setUserConfirmPwd("");
                            setIsLogged(false);
                        }
                    });
                } else {
                    setUsername("");
                    setUserFullName("");
                    setUserEmail("");
                    setUserPwd("");
                    setUserConfirmPwd("");
                    setIsLogged(false);
                }
            });
        }, [])
    );

    const handleUpdateProfile = async () => {
        if (
            validateUpdateUser({
                fullName: userFullName,
                email: userEmail,
                password: userPwd,
                confirmPassword: userConfirmPwd,
            })
        ) {
            const token = await AsyncStorage.getItem("userToken");
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

            if (token !== null) {
                const response = await updateUser(editedUser, token);

                if (!response.body.error && response.status === 200) {
                    setIsUserEdited(true);
                } else {
                    Alert.alert(
                        "Erro ao atualizar usuário",
                        response.body.error
                    );
                }
            }
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
            {isFocused && <LoggedInModal navObject={navigation} />}
            <Container>
                <HeaderTitle
                    text="Perfil"
                    goBack={isEditing}
                    onPressGoBack={() => setIsEditing(false)}
                />

                <KeyboardScrollView>
                    <LogoWrapper>
                        <Logo width={scale(75)} height={scale(75)} />
                    </LogoWrapper>

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

                    {isLogged && isEditing && (
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

                    {isLogged && (
                        <EditButton
                            isEditing={isEditing}
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
                            <ButtonLabel>
                                {isEditing ? "Salvar" : "Editar Perfil"}
                            </ButtonLabel>
                        </EditButton>
                    )}

                    {isLogged && !isEditing && (
                        <ButtonsContainer>
                            <ProfileButton
                                onPress={() =>
                                    navigation.navigate("Occurrences")
                                }
                            >
                                <Feather
                                    name="clipboard"
                                    size={scale(18)}
                                    color={theme.primaryWhite}
                                />
                                <ButtonLabel>Minhas Ocorrências</ButtonLabel>
                            </ProfileButton>

                            <ProfileButton onPress={() => {}}>
                                <Feather
                                    name="star"
                                    size={scale(18)}
                                    color={theme.primaryWhite}
                                />
                                <ButtonLabel>Minhas Avaliações</ButtonLabel>
                            </ProfileButton>
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
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Profile;

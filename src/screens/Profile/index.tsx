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

import HeaderTitle from "../../components/HeaderTitle";
import LoggedInModal from "../../components/LoggedInModal";
import { KeyboardScrollView, SendLabel } from "../../components/NormalForms";
import Logo from "../../img/logo.svg";
import { getUser, updateUser } from "../../services/users";
import { scale } from "../../utils/scalling";
import { validateUpdateUser } from "../../utils/validateUpdateUser";
import {
    Container,
    InputViewing,
    LabelsContainer,
    LabelViewing,
    LogoWrapper,
    EditButton,
    CanEditButton,
} from "./styles";

const Profile: React.FC = () => {
    const [username, setUsername] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userConfirmPwd, setUserConfirmPwd] = useState("");

    const isFocused = useIsFocused();

    const [isLogged, setIsLogged] = useState(false);

    const navigation = useNavigation();

    const [isEditing, setIsEditing] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem("username").then((username) => {
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

            const response = await updateUser(editedUser, token);

            if (!response.body.error && response.status === 200) {
                setIsEditing(!isEditing);
                Alert.alert("Usuário atualizado com sucesso!");
            } else {
                Alert.alert("Erro ao atualizar usuário", response.body.error);
            }
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f5" }}>
            {isFocused && <LoggedInModal navObject={navigation} />}
            <HeaderTitle text="Perfil" />
            <KeyboardScrollView>
                <Container>
                    <LogoWrapper>
                        <Logo width={scale(70)} height={scale(70)} />
                        {isLogged && (
                            <CanEditButton
                                onPress={() => setIsEditing(!isEditing)}
                            >
                                <SendLabel>
                                    {isEditing ? "Voltar" : "Editar perfil"}
                                </SendLabel>
                            </CanEditButton>
                        )}
                    </LogoWrapper>
                    <LabelsContainer>
                        <LabelViewing>Username</LabelViewing>
                        <InputViewing
                            editable={false}
                            isEditing={false}
                            returnKeyType="next"
                            maxLength={20}
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                        <LabelViewing>Nome Completo</LabelViewing>
                        <InputViewing
                            editable={isEditing}
                            isEditing={isEditing}
                            returnKeyType="next"
                            maxLength={200}
                            value={userFullName}
                            onChangeText={(text) => setUserFullName(text)}
                        />
                        <LabelViewing>Email</LabelViewing>
                        <InputViewing
                            editable={isEditing}
                            isEditing={isEditing}
                            returnKeyType="next"
                            keyboardType="email-address"
                            maxLength={50}
                            value={userEmail}
                            onChangeText={(text) => setUserEmail(text)}
                        />
                        {isEditing && (
                            <>
                                <LabelViewing>Senha</LabelViewing>
                                <InputViewing
                                    isEditing={isEditing}
                                    returnKeyType="next"
                                    secureTextEntry
                                    maxLength={20}
                                    value={userPwd}
                                    onChangeText={(text) => setUserPwd(text)}
                                />
                                <LabelViewing>Confirmar senha</LabelViewing>
                                <InputViewing
                                    isEditing={isEditing}
                                    secureTextEntry
                                    maxLength={20}
                                    value={userConfirmPwd}
                                    onChangeText={(text) =>
                                        setUserConfirmPwd(text)
                                    }
                                />
                                <EditButton onPress={handleUpdateProfile}>
                                    <SendLabel>Salvar</SendLabel>
                                </EditButton>
                            </>
                        )}
                    </LabelsContainer>
                </Container>
            </KeyboardScrollView>
        </SafeAreaView>
    );
};

export default Profile;

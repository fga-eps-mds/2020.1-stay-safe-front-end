import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import LogoContainer from "../../components/LogoContainer";
import {
    Container,
    KeyboardScrollView,
    Title,
    NormalLabel,
    NormalInput,
    NormalSend,
    SendLabel,
} from "../../components/NormalForms";
import { useUser } from "../../hooks/user";
import { createUser, authUser } from "../../services/users";
import { validateUser } from "../../utils/validateUser";

const Cadastro: React.FC = () => {
    const navigation = useNavigation();
    const { signIn } = useUser();

    const [username, setUsername] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userConfirmPwd, setUserConfirmPwd] = useState("");

    const [fullNameInput, setFullNameInput] = useState(NormalInput);
    const [emailInput, setEmailInput] = useState(NormalInput);
    const [pwdInput, setPwdInput] = useState(NormalInput);
    const [confirmPwdInput, setConfirmPwdInput] = useState(NormalInput);

    const [isLoading, setIsLoading] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const handleRegister = async () => {
        if (
            validateUser({
                fullName: userFullName,
                username,
                email: userEmail,
                password: userPwd,
                confirmPassword: userConfirmPwd,
            })
        ) {
            const response = await createUser({
                full_name: userFullName,
                username,
                email: userEmail,
                password: userPwd,
            });
            if (!response.body.error && response.status === 201) {
                const response = await authUser({
                    username,
                    password: userPwd,
                });
                if (!response.body.error && response.status === 200) {
                    setIsLoading(true);

                    setTimeout(() => setIsLoading(false), 5000);

                    await signIn({ username, password: userPwd });

                    setIsLoading(false);
                    navigation.navigate("HomeTabBar");
                } else {
                    Alert.alert("Erro ao logar usuário", response.body.error);
                }
            } else {
                Alert.alert("Erro ao cadastrar usuário", response.body.error);
            }
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="" goBack />

                <KeyboardScrollView>
                    <LogoContainer />

                    <Title>Cadastro</Title>

                    <NormalLabel>Username</NormalLabel>
                    <NormalInput
                        returnKeyType="next"
                        maxLength={20}
                        onChangeText={(text) => setUsername(text)}
                        onSubmitEditing={() => fullNameInput.focus()}
                    />

                    <NormalLabel>Nome Completo</NormalLabel>
                    <NormalInput
                        ref={(input) => setFullNameInput(input)}
                        returnKeyType="next"
                        maxLength={200}
                        onChangeText={(text) => setUserFullName(text)}
                        onSubmitEditing={() => emailInput.focus()}
                    />

                    <NormalLabel>Email</NormalLabel>
                    <NormalInput
                        ref={(input) => setEmailInput(input)}
                        returnKeyType="next"
                        keyboardType="email-address"
                        maxLength={50}
                        onChangeText={(text) => setUserEmail(text)}
                        onSubmitEditing={() => pwdInput.focus()}
                    />

                    <NormalLabel>Senha</NormalLabel>
                    <NormalInput
                        ref={(input) => setPwdInput(input)}
                        returnKeyType="next"
                        secureTextEntry
                        maxLength={20}
                        onChangeText={(text) => setUserPwd(text)}
                        onSubmitEditing={() => confirmPwdInput.focus()}
                    />

                    <NormalLabel>Confirmar Senha</NormalLabel>
                    <NormalInput
                        ref={(input) => setConfirmPwdInput(input)}
                        secureTextEntry
                        maxLength={20}
                        onChangeText={(text) => setUserConfirmPwd(text)}
                        onSubmitEditing={() => handleRegister()}
                    />

                    <NormalSend onPress={() => handleRegister()}>
                        <SendLabel>Criar Conta</SendLabel>
                    </NormalSend>
                    {isLoading && <Loader />}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Cadastro;

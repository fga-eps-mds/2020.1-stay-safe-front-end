import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Container,
    KeyboardScrollView,
    LogoWrapper,
    Title,
    NormalLabel,
    NormalInput,
    NormalSend,
    NormalCreate,
    SendLabel,
} from "../../components/NormalForms";
import Logo from "../../img/logo.svg";
import { authUser } from "../../services/users";
import { scale } from "../../utils/scalling";

const Login: React.FC = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const [passwordInput, setPasswordInput] = useState(NormalInput);

    const handleLogin = async () => {
        const response = await authUser({
            username,
            password: userPwd,
        });

        if (!response.body.error && response.status === 200) {
            AsyncStorage.setItem("userToken", response.body.token);
            AsyncStorage.setItem("username", username);
            navigation.navigate("HomeTabBar");
        } else {
            Alert.alert("Erro ao logar usuário", response.body.error);
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <KeyboardScrollView>
                    <LogoWrapper>
                        <Logo width={scale(75)} height={scale(75)} fill="#e83338" />
                    </LogoWrapper>

                    <Title>Entrar</Title>

                    <NormalLabel>Username</NormalLabel>
                    <NormalInput
                        returnKeyType="next"
                        maxLength={20}
                        onChangeText={(text) => setUsername(text)}
                        onSubmitEditing={() => passwordInput.focus()}
                    />

                    <NormalLabel>Senha</NormalLabel>
                    <NormalInput
                        ref={(input) => setPasswordInput(input)}
                        returnKeyType="next"
                        secureTextEntry
                        maxLength={20}
                        onChangeText={(text) => setUserPwd(text)}
                        onSubmitEditing={() => handleLogin()}
                    />

                    <NormalSend onPress={() => handleLogin()}>
                        <SendLabel>Entrar</SendLabel>
                    </NormalSend>

                    <NormalCreate
                        onPress={() => navigation.navigate("Cadastro")}
                    >
                        <SendLabel>Criar Conta</SendLabel>
                    </NormalCreate>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Login;

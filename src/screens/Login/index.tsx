import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import CircularLoader from "../../components/CircularLoader";
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
import { useUser } from "../../hooks/user";
import Logo from "../../img/logo.svg";
import { scale } from "../../utils/scalling";

const Login: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const { signIn } = useUser();

    const [username, setUsername] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const [passwordInput, setPasswordInput] = useState(NormalInput);

    const handleLogin = async () => {
        setIsLoading(true);

        await signIn({ username, password: userPwd });

        setIsLoading(false);
        navigation.navigate("HomeTabBar");
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <KeyboardScrollView>
                    <LogoWrapper>
                        <Logo
                            width={scale(75)}
                            height={scale(75)}
                            fill="#e83338"
                        />
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
                        {isLoading ? (
                            <CircularLoader size={20} />
                        ) : (
                            <SendLabel>Entrar</SendLabel>
                        )}
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

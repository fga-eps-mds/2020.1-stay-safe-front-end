import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import LogoContainer from "../../components/LogoContainer";
import {
    Container,
    KeyboardScrollView,
    Title,
    NormalLabel,
    NormalInput,
    ButtonWithIconLabel,
} from "../../components/NormalForms";
import { useUser } from "../../hooks/user";
import { scale } from "../../utils/scalling";

const Login: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
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

        setTimeout(() => setIsLoading(false), 5000);

        await signIn({ username, password: userPwd });

        setIsLoading(false);
        navigation.navigate("HomeTabBar");
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <KeyboardScrollView>
                    <LogoContainer />

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

                    <Button
                        color={theme.primaryRed}
                        onPress={() => handleLogin()}
                    >
                        <Feather
                            name="log-in"
                            size={scale(18)}
                            color={theme.primaryWhite}
                        />
                        <ButtonWithIconLabel>Entrar</ButtonWithIconLabel>
                    </Button>

                    <Button
                        color={theme.primaryLightBlue}
                        onPress={() => navigation.navigate("Cadastro")}
                    >
                        <Feather
                            name="user-plus"
                            size={scale(18)}
                            color={theme.primaryWhite}
                        />
                        <ButtonWithIconLabel>Criar Conta</ButtonWithIconLabel>
                    </Button>
                    {isLoading && <Loader />}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Login;

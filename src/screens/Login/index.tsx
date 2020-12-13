import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import ErrorModal from "../../components/ErrorModal";
import Loader from "../../components/Loader";
import LogoContainer from "../../components/LogoContainer";
import {
    Container,
    KeyboardScrollView,
    Title,
    NormalLabel,
    NormalInput,
    ButtonWithIconLabel,
    InputWithIcon,
} from "../../components/NormalForms";
import { useUser } from "../../hooks/user";
import { scale } from "../../utils/scalling";

const Login: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { signIn } = useUser();

    const [username, setUsername] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<[string, string]>([
        "",
        "",
    ]);

    const [isLoading, setIsLoading] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const [seePassword, setSeePassword] = useState(false);

    const [passwordInput, setPasswordInput] = useState(NormalInput);

    const handleLogin = async () => {
        setIsLoading(true);

        let error = "";
        const sanitizedUsername = username.split(" ")[0];
        try {
            error = await signIn({
                username: sanitizedUsername,
                password: userPwd,
            });
            if (error) {
                setHasError(true);
                setErrorMessage(["Erro ao logar usuário", error]);
            }
        } catch (e) {
        } finally {
            setIsLoading(false);
            navigation.navigate("HomeTabBar");
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <KeyboardScrollView>
                    <LogoContainer />

                    <Title>Entrar</Title>

                    <NormalLabel>Nome de usuário</NormalLabel>
                    <NormalInput
                        returnKeyType="next"
                        maxLength={20}
                        onChangeText={(text) => setUsername(text)}
                        onSubmitEditing={() => passwordInput.focus()}
                    />

                    <NormalLabel>Senha</NormalLabel>
                    <InputWithIcon>
                        <NormalInput
                            style={{ width: "100%" }}
                            ref={(input) => setPasswordInput(input)}
                            returnKeyType="next"
                            secureTextEntry={!seePassword}
                            maxLength={20}
                            onChangeText={(text) => setUserPwd(text)}
                            onSubmitEditing={() => handleLogin()}
                        />
                        <TouchableOpacity
                            style={{
                                alignSelf: "center",
                                position: "absolute",
                                right: 0,
                                top: 0,
                                paddingRight: scale(10),
                            }}
                            onPress={() => setSeePassword(!seePassword)}
                        >
                            <Feather
                                name={!seePassword ? "eye" : "eye-off"}
                                size={scale(20)}
                                color={theme.primarySuperDarkBlue}
                            />
                        </TouchableOpacity>
                    </InputWithIcon>

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
                        style={{ marginBottom: scale(30) }}
                    >
                        <Feather
                            name="user-plus"
                            size={scale(18)}
                            color={theme.primaryWhite}
                        />
                        <ButtonWithIconLabel>Criar Conta</ButtonWithIconLabel>
                    </Button>
                    <ErrorModal
                        show={hasError}
                        message={errorMessage}
                        onPress={() => setHasError(false)}
                    />
                    {isLoading && <Loader />}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Login;

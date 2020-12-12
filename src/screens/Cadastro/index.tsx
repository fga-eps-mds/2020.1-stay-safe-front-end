import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import ErrorModal from "../../components/ErrorModal";
import HeaderTitle from "../../components/HeaderTitle";
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
import { createUser, authUser } from "../../services/users";
import { scale } from "../../utils/scalling";
import { validateUser } from "../../utils/validateUser";

const Cadastro: React.FC = () => {
    const theme = useTheme();
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

    const handleRegister = async () => {
        const error = validateUser({
            fullName: userFullName,
            username,
            email: userEmail,
            password: userPwd,
            confirmPassword: userConfirmPwd,
        });

        if (error === "") {
            setIsLoading(true);

            try {
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
                        await signIn({ username, password: userPwd });

                        navigation.navigate("HomeTabBar");
                    } else {
                        setHasError(true);
                        setErrorMessage([
                            "Erro ao logar usuário",
                            response.body.error,
                        ]);
                    }
                } else {
                    setHasError(true);
                    setErrorMessage([
                        "Erro ao cadastrar usuário",
                        response.body.error,
                    ]);
                }
            } catch (e) {
                console.warn(e);
            } finally {
                setIsLoading(false);
            }
        } else {
            setHasError(true);
            setErrorMessage(["Campo Inválido", error]);
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

                    <NormalLabel>Nome de usuário</NormalLabel>
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

                    <Button
                        onPress={() => handleRegister()}
                        color={theme.primaryRed}
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

export default Cadastro;

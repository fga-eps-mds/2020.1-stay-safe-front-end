import * as Font from "expo-font";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTitle from "../../components/HeaderTitle";
import LogoContainer from "../../components/LogoContainer";
import { Container } from "../../components/NormalForms";
import { AboutText, AppTitle } from "./styles";

const About: React.FC = () => {
    const [loaded] = Font.useFonts({
        "Age-Regular": require("../../fonts/Age.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Sobre" goBack />
                <LogoContainer />
                <AppTitle>STAYSAFE</AppTitle>
                <AboutText>
                    A história do aplicativo StaySafe tem início em 2020, quando
                    um grupo idealiza o projeto na disciplina de Métodos de
                    Desenvolvimento de Software na Universidade de Brasília
                    (UnB).
                    {"\n\n"}O StaySafe é um aplicativo mobile para Android que
                    mostra, através de mapas e estatísicas, informações sobre a
                    segurança de diversos locais. Os dados exibidos são obtidos
                    das Secretarias de Segurança Pública e dos usuários do
                    aplicativo que podem contribuir registrando uma ocorrência
                    da qual foram vítimas ou testemunhas, e avaliando a
                    segurança dos bairros que conhecem.
                </AboutText>
            </Container>
        </SafeAreaView>
    );
};

export default About;

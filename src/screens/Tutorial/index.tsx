import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import React from "react";
import { useUser } from "../../hooks/user";
import { useTheme } from "styled-components";
import { slides } from "./slidesScreens";
import { scale } from "../../utils/scalling";

import {
    TutorialSlider,
    Container,
    ButtonContainer,
    Button,
    ButtonLabel,
    Title,
    ImageSlide,
    Description,
} from "./styles";

const Tutorial: React.FC = () => {
    const navigation = useNavigation();
    const { updateShowTutorial } = useUser();
    const theme = useTheme();

    let slider;

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const renderSlide = ({ item }) => {
        return (
            <Container>
                <Title>{item.title}</Title>
                <ImageSlide source={item.image} />
                <Description>{item.text}</Description>
            </Container>
        );
    };

    const _renderPagination = (activeIndex: number) => {
        return (
            <>
                <ButtonContainer>
                    <Button style={{ backgroundColor: theme.primaryLightBlue }}>
                        <ButtonLabel>Voltar</ButtonLabel>
                    </Button>
                    <Button>
                        <ButtonLabel>Avançar</ButtonLabel>
                    </Button>
                </ButtonContainer>
            </>
        );
    };

    const endTutorial = async () => {
        await updateShowTutorial(false);
        navigation.navigate("HomeTabBar");
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TutorialSlider
                renderItem={renderSlide}
                data={slides}
                onDone={endTutorial}
                renderPagination={_renderPagination}
                ref={(ref) => (slider = ref)}
            />
        </SafeAreaView>
    );
};

export default Tutorial;
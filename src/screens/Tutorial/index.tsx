import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import React, { useState } from "react";
import { useUser } from "../../hooks/user";
import { useTheme } from "styled-components";
import { slides } from "./slidesScreens";

import {
    TutorialSlider,
    Container,
    DotsContainer,
    Dot,
    Title,
    ImageSlide,
    Description,
    ButtonContainer,
    Button,
    ButtonLabel,
} from "./styles";

const Tutorial: React.FC = () => {
    const [slider, setSlider] = useState(TutorialSlider);
    
    const { updateShowTutorial } = useUser();
    const navigation = useNavigation();
    const theme = useTheme();

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

    const renderPagination = (activeIndex: number) => {
        return (
            <>
                <DotsContainer>
                    {slides.length > 1 &&
                        slides.map((slide, i) => (
                            <Dot
                                key={slide.key}
                                selected={i === activeIndex}
                                onPress={() => slider?.goToSlide(i, true)}
                            />
                        ))}
                </DotsContainer>

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
                ref={(ref) => setSlider(ref)}
                data={slides}
                renderItem={renderSlide}
                renderPagination={renderPagination}
                onDone={endTutorial}
            />
        </SafeAreaView>
    );
};

export default Tutorial;
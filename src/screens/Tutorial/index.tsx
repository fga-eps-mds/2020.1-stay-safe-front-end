import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import * as Font from "expo-font";
import React, { useCallback, useState } from "react";
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
    
    const { updateShowTutorial, switchTheme } = useUser();
    const navigation = useNavigation();
    const theme = useTheme();

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useFocusEffect( 
        useCallback(() => {
          if (theme.type === "default") {
            switchTheme();
          }
        }, [theme.type])
    );

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
                        slides.map((slide, index) => (
                            <Dot
                                key={slide.key}
                                selected={index === activeIndex}
                                onPress={() => slider?.goToSlide(index, true)}
                            />
                        ))}
                </DotsContainer>

                <ButtonContainer>
                    <View>
                        {activeIndex > 0 &&
                            <Button
                                onPress={() => slider?.goToSlide(activeIndex-1, true)}
                                style={{ backgroundColor: theme.primaryLightBlue }}
                            >
                                <ButtonLabel>Voltar</ButtonLabel>
                            </Button>
                        }
                    </View>
                    {activeIndex !== slides.length-1 ?
                        <Button
                            onPress={() => slider?.goToSlide(activeIndex+1, true)}
                        >
                            <ButtonLabel>Avançar</ButtonLabel>
                        </Button>
                    :
                        <Button
                            onPress={() => endTutorial()}
                        >
                            <ButtonLabel>Entendido</ButtonLabel>
                        </Button>    
                    }
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
            />
        </SafeAreaView>
    );
};

export default Tutorial;
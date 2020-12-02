import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import AppIntroSlider from "react-native-app-intro-slider";
import React from "react";

import {
    Container,
    Title,
    ImageSlide,
    Text
} from "./styles";
import { slides } from "./slidesScreens";
import { useUser } from "../../hooks/user";

const Tutorial: React.FC = () => {
    const navigation = useNavigation();
    const { updateShowTutorial } = useUser();

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const renderSlide = ({ item }) => {
        return (
            <Container>
                <Title>{item.title}</Title>
                <ImageSlide source={item.image} />
                <Text>{item.text}</Text>
            </Container>
        );
    }

    const endTutorial = async () => {
        await updateShowTutorial(false);
        navigation.navigate("HomeTabBar");
    }

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppIntroSlider
                renderItem={renderSlide}
                data={slides}
                onDone={endTutorial}
                showPrevButton={true}
                prevLabel="Voltar"
                nextLabel="Avançar"
                doneLabel="Entendido!"
            />
        </SafeAreaView>
    );
}

export default Tutorial;
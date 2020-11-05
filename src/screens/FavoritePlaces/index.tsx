import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import { Container, KeyboardScrollView } from "../../components/NormalForms";
import { useUser } from "../../hooks/user";
import { getFavoritePlaces } from "../../services/favoritePlaces";
import { PlaceCard, PlaceTitle, DeletePlace } from "./styles";

interface FavoritePlace {
    name: string;
    latitude: number;
    longitude: number;
}

const FavoritePlaces: React.FC = () => {
    const theme = useTheme();
    const { data } = useUser();

    const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);

    useEffect(() => {
        getPlaces();
    }, []);

    const getPlaces = async () => {
        if (data.token !== "") {
            const response = await getFavoritePlaces(data.token);

            if (response.status === 200) {
                setFavoritePlaces(response.body);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Locais Favoritos" goBack />
                <KeyboardScrollView>
                    {favoritePlaces.map((place: FavoritePlace) => {
                        return (
                            <PlaceCard
                                style={{ elevation: 5 }}
                                key={place.name}
                            >
                                <PlaceTitle>{place.name}</PlaceTitle>

                                <DeletePlace onPress={() => {}}>
                                    <Feather
                                        name="trash-2"
                                        size={22}
                                        color={theme.primarySuperDarkBlue}
                                    />
                                </DeletePlace>
                            </PlaceCard>
                        );
                    })}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default FavoritePlaces;

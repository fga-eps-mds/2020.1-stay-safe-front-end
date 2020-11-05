import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import { Container, KeyboardScrollView } from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import {
    getFavoritePlaces,
    deleteFavoritePlace,
} from "../../services/favoritePlaces";
import { PlaceCard, PlaceTitle, DeletePlace } from "./styles";

interface FavoritePlace {
    id_place: number;
    name: string;
    latitude: number;
    longitude: number;
}

const FavoritePlaces: React.FC = () => {
    const theme = useTheme();
    const { data } = useUser();

    const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);

    const [showDeleteModal, setDeleteModal] = useState(false);
    const [idPlace, setIdPlace] = useState(0);

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

    const handleDelete = async (idPlace: number) => {
        if (data.token !== "") {
            const response = await deleteFavoritePlace(idPlace, data.token);

            if (response.status === 204) {
                setFavoritePlaces(
                    favoritePlaces.filter(
                        (place: FavoritePlace) => place.id_place !== idPlace
                    )
                );
                setDeleteModal(false);
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
                                key={place.id_place}
                            >
                                <PlaceTitle>{place.name}</PlaceTitle>

                                <DeletePlace
                                    onPress={() => {
                                        setDeleteModal(true);
                                        setIdPlace(place.id_place);
                                    }}
                                >
                                    <Feather
                                        name="trash-2"
                                        size={22}
                                        color={theme.primarySuperDarkBlue}
                                    />
                                </DeletePlace>
                            </PlaceCard>
                        );
                    })}
                    <StayAlert
                        show={showDeleteModal}
                        title="Apagar Local Favorito"
                        message="Tem certeza que deseja apagar esse local? A ação não pode ser desfeita."
                        showConfirmButton
                        confirmText="Apagar"
                        onConfirmPressed={() => handleDelete(idPlace)}
                        showCancelButton
                        cancelText="Cancelar"
                        onCancelPressed={() => setDeleteModal(false)}
                        onDismiss={() => setDeleteModal(false)}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default FavoritePlaces;

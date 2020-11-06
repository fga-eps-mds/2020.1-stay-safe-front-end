import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Dialog from "react-native-dialog";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import { Container, KeyboardScrollView } from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import {
    getFavoritePlaces,
    deleteFavoritePlace,
    createFavoritePlace,
} from "../../services/favoritePlaces";
import {
    PlaceCard,
    PlaceTitle,
    DeletePlace,
    AddPlace,
    DialogTitle,
    DialogDescription,
    DialogInput,
    ButtonsContainer,
    DialogButton,
} from "./styles";

interface FavoritePlace {
    id_place: number;
    name: string;
    latitude: number;
    longitude: number;
}

type ParamPlace = {
    params: {
        latitude: number;
        longitude: number;
    };
};

const FavoritePlaces: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const { data } = useUser();
    const route = useRoute<RouteProp<ParamPlace, "params">>();

    const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);
    const [location, setLocation] = useState<[number, number]>([0, 0]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [favoritePlaceName, setFavoritePlaceName] = useState("");

    const [showSuccessfullyModal, setShowSuccessfullyModal] = useState(false);

    const [showDeleteModal, setDeleteModal] = useState(false);
    const [idPlace, setIdPlace] = useState(0);

    useEffect(() => {
        getPlaces();
    }, [route]);

    useEffect(() => {
        if (route.params) {
            setLocation([route.params.latitude, route.params.longitude]);
            setIsDialogOpen(true);
        }
    }, [route]);

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

    const handleCloseDialog = () => {
        setIsDialogOpen(false);

        navigation.setParams({ latitude: null, longitude: null });
    };

    const handleConfirmFavoritePlace = async () => {
        handleCloseDialog();

        if (data.token !== "") {
            const FavoritePlace = {
                name: favoritePlaceName,
                latitude: location[0],
                longitude: location[1],
            };

            const response = await createFavoritePlace(
                FavoritePlace,
                data.token
            );

            if (response.status === 201) {
                setShowSuccessfullyModal(true);
            } else {
                Alert.alert(
                    "Erro ao cadastrar local favorito",
                    response.body.error
                );
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Locais Favoritos" goBack />
                <KeyboardScrollView>
                    {favoritePlaces.length === 0 ? (
                        <PlaceCard style={{ elevation: 5 }}>
                            <PlaceTitle>
                                Você não possui locais cadastrados.
                            </PlaceTitle>
                        </PlaceCard>
                    ) : (
                        favoritePlaces.map((place: FavoritePlace) => {
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
                        })
                    )}
                    <AddPlace
                        icon="plus"
                        onPress={() => {
                            navigation.navigate("Home", {
                                showFavoritePlaceModal: true,
                            });
                        }}
                    />
                    <Dialog.Container
                        visible={isDialogOpen}
                        onBackdropPress={() => handleCloseDialog()}
                    >
                        <DialogTitle>Local Favorito</DialogTitle>
                        <DialogDescription>
                            Defina o nome do seu local favorito
                        </DialogDescription>
                        <DialogInput
                            onChangeText={(text: string) =>
                                setFavoritePlaceName(text)
                            }
                            placeholder="ex: Minha Casa"
                        />
                        <ButtonsContainer>
                            <DialogButton
                                color="#ffffff"
                                label="Cancelar"
                                onPress={() => handleCloseDialog()}
                            />
                            <DialogButton
                                style={{
                                    backgroundColor: "#e83338",
                                    marginRight: 0,
                                }}
                                color="#ffffff"
                                disabled={favoritePlaceName.length === 0}
                                label="Confirmar"
                                onPress={() => handleConfirmFavoritePlace()}
                            />
                        </ButtonsContainer>
                    </Dialog.Container>
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
                    <StayAlert
                        show={showSuccessfullyModal}
                        title="Local Favorito"
                        message={`${favoritePlaceName} cadastrado com sucesso.`}
                        showConfirmButton
                        confirmText="Entendido"
                        onConfirmPressed={() => setShowSuccessfullyModal(false)}
                        onDismiss={() => setShowSuccessfullyModal(false)}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default FavoritePlaces;

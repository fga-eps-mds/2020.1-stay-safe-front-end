import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import {
    ScrollViewStyled,
    CardContainer,
    Card,
    CardData,
    Title,
    NeighText,
    Date,
    CardActions,
} from "../../components/Cards";
import HeaderTitle from "../../components/HeaderTitle";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import { getUserRatings, deleteRating } from "../../services/ratings";
import { scale } from "../../utils/scalling";

interface Rating {
    id_rating: number;
    rating_neighborhood: number;
    neighborhood: Neighborhood;
    details: {
        lighting: boolean;
        movement_of_people: boolean;
        police_rounds: boolean;
    };
    user: string;
}

interface Neighborhood {
    city: string;
    id_neighborhood: number;
    neighborhood: string;
    state: string;
}

const Ratings: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const { data } = useUser();

    const [ratings, setRatings] = useState<Rating[]>([]);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [idRating, setIdRating] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        if (data.username !== "") {
            const response = await getUserRatings(data.username);
            if (!response.body.errors && response.status === 200)
                setRatings(response.body);
            else console.warn("Falha ao carregar as avaliações do usuário.");
        }
    };

    const handleDelete = async (id: number) => {
        if (data.token !== "") {
            const response = await deleteRating(id, data.token);
            if (response.status === 204) {
                setRatings(ratings.filter((rating) => rating.id_rating !== id));
            }
        }
        setConfirmModal(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text="Minhas Avaliações" goBack />
            <ScrollViewStyled>
                <CardContainer>
                    {ratings.length === 0 ? (
                        <Card>
                            <CardData>
                                <Title>Nenhuma avaliação :(</Title>
                            </CardData>
                        </Card>
                    ) : (
                        ratings.map((rating) => {
                            return (
                                <Card key={rating.id_rating}>
                                    <CardData>
                                        <Title>
                                            {rating.neighborhood.neighborhood}
                                        </Title>
                                        <NeighText>
                                            {rating.neighborhood.city} -{" "}
                                            {rating.neighborhood.state}
                                        </NeighText>
                                        <Date>03-2020</Date>
                                    </CardData>

                                    <CardActions>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Rating", {
                                                    rating,
                                                });
                                            }}
                                        >
                                            <Feather
                                                name="edit-3"
                                                size={scale(22)}
                                                color={
                                                    theme.primarySuperDarkBlue
                                                }
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setConfirmModal(true);
                                                setIdRating(rating.id_rating);
                                            }}
                                        >
                                            <Feather
                                                name="trash-2"
                                                size={scale(22)}
                                                color={
                                                    theme.primarySuperDarkBlue
                                                }
                                            />
                                        </TouchableOpacity>
                                    </CardActions>
                                </Card>
                            );
                        })
                    )}
                </CardContainer>
                <StayAlert
                    show={showConfirmModal}
                    title="Apagar Avaliação"
                    message="Tem certeza que deseja apagar essa avaliação? A ação não pode ser desfeita."
                    showConfirmButton
                    confirmText="Apagar"
                    onConfirmPressed={() => handleDelete(idRating)}
                    showCancelButton
                    cancelText="Cancelar"
                    onCancelPressed={() => setConfirmModal(false)}
                    onDismiss={() => setConfirmModal(false)}
                />
            </ScrollViewStyled>
        </SafeAreaView>
    );
};

export default Ratings;

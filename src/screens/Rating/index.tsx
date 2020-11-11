import { AntDesign } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import { SendLabel, NormalSend } from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import { createRating, updateRating } from "../../services/ratings";
import { scale } from "../../utils/scalling";
import {
    detailsItems,
    lightingObject,
    movementObject,
    policeObject,
} from "./detailsConstants";
import {
    Container,
    LocalName,
    StarsRating,
    TellUs,
    Detail,
    DetailLabel,
    DetailContainer,
    ImpressionContainer,
} from "./styles";

type ParamRating = {
    params: {
        rating: {
            id_rating: number;
            rating_neighborhood: number;
            neighborhood: Neighborhood;
            details: Details;
            user: string;
        };
    };
};

interface Neighborhood {
    city: string;
    id_neighborhood: number;
    neighborhood: string;
    state: string;
}

interface Details {
    lighting: boolean;
    movement_of_people: boolean;
    police_rounds: boolean;
}

const Rating: React.FC = () => {
    const navigation = useNavigation();
    const { data } = useUser();
    const theme = useTheme();

    const route = useRoute<RouteProp<ParamRating, "params">>();

    const name = `${route.params.rating.neighborhood.neighborhood} - ${route.params.rating.neighborhood.state}`;

    const [isEditing, setIsEditing] = useState(false);

    const [idRating, setIdRating] = useState(0);
    const [stars, setStars] = useState(3);
    const [editingDetails, setEditingDetails] = useState<Details>({
        lighting: false,
        movement_of_people: false,
        police_rounds: false,
    });

    const [items, setItems] = useState(detailsItems);
    // const [lighting, setLighting] = useState(lightingObject);
    // const [movementOfPeople, setMovementOfPeople] = useState(movementObject);
    // const [policeRounds, setPoliceRounds] = useState(policeObject);

    const [showSuccessfullyModal, setShowSuccessfullyModal] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", () => {
            navigation.setParams({ rating: null });
        });

        return unsubscribe;
    }, [navigation]);

    const fetchData = () => {
        if (!route.params.rating.id_rating) {
            return null;
        }

        const rating = route.params.rating;

        setIsEditing(true);
        setIdRating(rating.id_rating);
        setStars(rating.rating_neighborhood);
        // setEditingDetails(rating.details);

        const newItems = [];
        let intermediate;

        setItems(
            items.map((item) => {
                if (
                    item.value === "lighting" &&
                    rating.details.lighting !== undefined
                ) {
                    const likeOrDislike = rating.details.lighting
                        ? "like"
                        : "dislike";

                    return {
                        ...item,
                        [likeOrDislike]:
                            likeOrDislike === "dislike"
                                ? true
                                : rating.details.lighting,
                    };
                } else if (
                    item.value === "movement_of_people" &&
                    rating.details.movement_of_people !== undefined
                ) {
                    const likeOrDislike = rating.details.movement_of_people
                        ? "like"
                        : "dislike";

                    return {
                        ...item,
                        [likeOrDislike]:
                            likeOrDislike === "dislike"
                                ? true
                                : rating.details.movement_of_people,
                    };
                } else if (rating.details.police_rounds !== undefined) {
                    const likeOrDislike = rating.details.police_rounds
                        ? "like"
                        : "dislike";

                    return {
                        ...item,
                        [likeOrDislike]:
                            likeOrDislike === "dislike"
                                ? true
                                : rating.details.police_rounds,
                    };
                }
                console.log(item);

                return item;
            })
        );

        // ["lighting", "movement_of_people", "police_rounds"].map(
        //     (impression) => {
        //         if (rating.details[impression])
        //             setItems(
        //                 items.map((item) => {
        //                     if (item.value === impression) {
        //                         const likeOrDislike = route.params.rating
        //                             .details[impression]
        //                             ? "like"
        //                             : "dislike";
        //                         console.log({
        //                             ...item,
        //                             [likeOrDislike]:
        //                                 route.params.rating.details[impression],
        //                         });
        //                         return {
        //                             ...item,
        //                             [likeOrDislike]:
        //                                 route.params.rating.details[impression],
        //                         };
        //                     }
        //                     return item;
        //                 })
        //             );
        //     }
        // );

        console.log("\n\n--------------------\n\n");
        // setItems(newItems);
        // console.log(newItems);
        // setTimeout(() => {
        // console.log(items);
        // }, 20000);
    };

    const getEditingImpression = (impression: string) => {
        const newItems = items.map((item) => {
            if (item.value === impression) {
                const likeOrDislike = route.params.rating.details[impression]
                    ? "like"
                    : "dislike";
                return {
                    ...item,
                    [likeOrDislike]: route.params.rating.details[impression],
                };
            }
        });

        const usedItems = newItems.filter((item) => item !== undefined);

        return usedItems[0];
    };

    useEffect(() => {
        fetchData();
    }, [route]);

    const handleDetail = (value: string, type: string) => {
        const selectLike = type === "like";
        setItems(
            items.map((item) => {
                if (item.value === value) {
                    const otherOption = selectLike ? "dislike" : "like";
                    return {
                        ...item,
                        [type]: !item[type],
                        [otherOption]: false,
                    };
                }
                return item;
            })
        );
    };

    const getImpression = (option: string) => {
        const item = items.filter((item) => item.value === option)[0];

        const { like, dislike } = item;

        return like ? like : dislike ? false : null;
    };

    const createRatingObject = () => {
        const dataRating = {};

        dataRating.rating_neighborhood = stars;
        const lighting = getImpression("lighting");
        const movement_of_people = getImpression("movement_of_people");
        const police_rounds = getImpression("police_rounds");

        if (movement_of_people !== null)
            dataRating.movement_of_people = movement_of_people;
        if (lighting !== null) dataRating.lighting = lighting;
        if (police_rounds !== null) dataRating.police_rounds = police_rounds;

        return dataRating;
    };

    const handleSubmit = async () => {
        const dataRating = createRatingObject();
        console.log(dataRating);
        if (data.token !== "") {
            const response = isEditing
                ? await updateRating(idRating, data.token, dataRating)
                : await createRating(
                      route.params.rating.neighborhood.id_neighborhood,
                      data.token,
                      dataRating
                  );
            console.log(idRating);

            if (!response.body.error && response.status === 201) {
                setShowSuccessfullyModal(true);
            } else if (!response.body.error && response.status === 200) {
                setShowSuccessfullyModal(true);
            } else {
                Alert.alert(
                    "Erro ao cadastrar ocorrência",
                    response.body.error
                );
            }
        }
    };

    const handleClosedModal = () => {
        setShowSuccessfullyModal(false);

        if (isEditing) {
            navigation.navigate("Ratings");
        } else {
            navigation.navigate("CityStatistics");
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle
                    text={isEditing ? "Editar Avaliação" : "Avaliar Bairro"}
                    goBack
                />

                <LocalName>{name}</LocalName>

                <StarsRating
                    defaultRating={stars}
                    onFinishRating={(rate: number) => setStars(rate)}
                />

                <TellUs>Conte-nos o por quê:</TellUs>

                {items.map((detail, key) => {
                    return (
                        <DetailContainer key={key}>
                            <Detail
                                style={{ elevation: 3 }}
                                // onPress={() => handleDetail(detail.value)}
                            >
                                <DetailLabel>{detail.label}</DetailLabel>
                            </Detail>
                            <ImpressionContainer
                                color={theme.primaryImpressionGreen}
                                select={detail.like}
                                style={{ elevation: 3 }}
                            >
                                <AntDesign
                                    name="like2"
                                    size={scale(25)}
                                    color={theme.primarySuperDarkBlue}
                                    onPress={() =>
                                        handleDetail(detail.value, "like")
                                    }
                                />
                            </ImpressionContainer>
                            <ImpressionContainer
                                select={detail.dislike}
                                color={theme.primaryRed}
                                style={{ elevation: 3 }}
                            >
                                <AntDesign
                                    name="dislike2"
                                    size={scale(25)}
                                    color={theme.primarySuperDarkBlue}
                                    onPress={() =>
                                        handleDetail(detail.value, "dislike")
                                    }
                                />
                            </ImpressionContainer>
                        </DetailContainer>
                    );
                })}

                <NormalSend onPress={() => handleSubmit()}>
                    <SendLabel>Salvar</SendLabel>
                </NormalSend>

                <StayAlert
                    show={showSuccessfullyModal}
                    title={isEditing ? "Editar Avaliação" : "Avaliar Bairro"}
                    message={
                        isEditing
                            ? "Avaliação editada com sucesso!"
                            : "Avaliação cadastrada com sucesso!"
                    }
                    showConfirmButton
                    confirmText="Entendido"
                    onConfirmPressed={() => handleClosedModal()}
                    onDismiss={() => handleClosedModal()}
                />
            </Container>
        </SafeAreaView>
    );
};

export default Rating;

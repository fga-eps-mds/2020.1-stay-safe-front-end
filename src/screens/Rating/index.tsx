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
import { detailsItems } from "./detailsConstants";
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

    const editRatingRoute = useRoute<RouteProp<ParamRating, "params">>();

    const [isEditing, setIsEditing] = useState(false);

    const [idRating, setIdRating] = useState(0);
    const [name, setName] = useState("");
    const [stars, setStars] = useState(3);
    const [details, setDetails] = useState<Details>({
        lighting: false,
        movement_of_people: false,
        police_rounds: false,
    });

    const [items, setItems] = useState(detailsItems);

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
        if (!editRatingRoute.params) {
            return null;
        }

        const rating = editRatingRoute.params.rating;
        const name = `${rating.neighborhood.neighborhood} - ${rating.neighborhood.state}`;

        setIsEditing(true);
        setIdRating(rating.id_rating);
        setName(name);
        setStars(rating.rating_neighborhood);
        setDetails(rating.details);
    };

    useEffect(() => {
        fetchData();
    }, [editRatingRoute]);

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
        if (data.token !== "") {
            //setIsLoading(true);
            const response = isEditing
                ? await updateRating(idRating, data.token, dataRating)
                : await createRating(26, data.token, dataRating);

            if (!response.body.error && response.status === 201) {
                navigation.setParams({ rating: null });
                setShowSuccessfullyModal(true);
            } else if (!response.body.error && response.status === 200) {
                navigation.setParams({ rating: null });
                setShowSuccessfullyModal(true);
            } else {
                Alert.alert(
                    "Erro ao cadastrar ocorrência",
                    response.body.error
                );
            }
            //setIsLoading(false);
        }
    };

    const handleClosedModal = () => {
        setShowSuccessfullyModal(false);

        if (isEditing) {
            navigation.navigate("Ratings");
        } else {
            navigation.goBack();
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

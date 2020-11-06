import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import {
    SendLabel,
    NormalSend
} from "../../components/NormalForms";
import {
    Container,
    LocalName,
    StarsRating,
    TellUs,
    Detail,
    DetailLabel
} from "./styles";
import { detailsItems } from './detailsConstants';
import StayAlert from "../../components/StayAlert";

import { useUser } from "../../hooks/user";
import { createRating, updateRating } from "../../services/ratings";

type ParamRating = {
    params: {
        rating: {
            id_rating: number,
            rating_neighborhood: number,
            neighborhood: Neighborhood,
            details: Details,
            user: string,
        };
    };
};

interface Neighborhood {
    city: string,
    id_neighborhood: number,
    neighborhood: string,
    state: string
};

interface Details {
    lighting: boolean | false,
    movement_of_people: boolean | false,
    police_rounds: boolean | false,
};

const Rating: React.FC = () => {
    const navigation = useNavigation();
    const { data } = useUser();
    const theme = useTheme();

    const editRatingRoute = useRoute<
        RouteProp<ParamRating, "params">
    >();

    const [isEditing, setIsEditing] = useState(false);

    const [idRating, setIdRating] = useState(0);
    const [name, setName] = useState('');
    const [stars, setStars] = useState(3);
    const [details, setDetails] = useState<Details>();

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
        if (!editRatingRoute.params.rating) {
            return null;
        }

        const rating = editRatingRoute.params.rating;
        const name = `${rating.neighborhood.neighborhood} - ${rating.neighborhood.state}`

        setIsEditing(true);
        setIdRating(rating.id_rating);
        setName(name);
        setStars(rating.rating_neighborhood);
        setDetails(rating.details);
    };

    useEffect(() => {
        fetchData();
    }, [editRatingRoute]);

    const handleDetail = (option: string) => {
        if (details) {
            setDetails({...details, [option]: !details[option]})
        }
    }

    const isDetail = (option: string) => {
        if (details) {
            return details[option]
        }
    }

    const handleSubmit = async () => {
        const dataRating = {
            rating_neighborhood: stars,
            lighting: details?.lighting || false,
            movement_of_people: details?.movement_of_people || false,
            police_rounds: details?.police_rounds || false,
        };
        if (true) {
            if (data.token !== "") {
                //setIsLoading(true);
                const response = isEditing
                    ? await updateRating(
                          idRating,
                          data.token,
                          dataRating
                      )
                    : await createRating(50, data.token, dataRating);

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
                    text={
                        isEditing ? "Editar Avaliação" : "Avaliar Bairro"
                    }
                    goBack
                />

                <LocalName>{name}</LocalName>

                <StarsRating
                    defaultRating={stars}
                    onFinishRating={(rate: number) => setStars(rate)}
                />

                <TellUs>Conte-nos o por quê:</TellUs>

                {detailsItems.map((detail, key) => (
                    <Detail
                        key={key}
                        onPress={() => handleDetail(detail.value)}
                        selected={isDetail(detail.value)}
                    >
                        <DetailLabel>
                            {detail.label}
                        </DetailLabel>
                    </Detail>
                ))}

                <NormalSend onPress={() => handleSubmit()}>
                    <SendLabel>Salvar</SendLabel>
                </NormalSend>

                <StayAlert
                    show={showSuccessfullyModal}
                    title={
                        isEditing
                            ? "Editar Avaliação"
                            : "Avaliar Bairro"
                    }
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
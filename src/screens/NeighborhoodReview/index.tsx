import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import {
    InfoModal,
    InfoTitle,
    InfoContainer,
    Info,
    InfoColor,
    InfoText,
    InfoSubText,
} from "../../components/InfoModal";
import { KeyboardScrollView } from "../../components/NormalForms";
import { scale } from "../../utils/scalling";
import { impressions } from "./impressions";
import {
    StarContainer,
    StatisticsNeighborhoodCard,
    NeighborhoodTitle,
    NeighborhoodText,
    ImpressionsContainer,
    EvaluateButton,
    EvaluateButtontText,
    TitleCity,
    NeighborhoodAverage,
    ImpressionText,
    PointContainer,
} from "./styles";

type ParamList = {
    params: {
        neighborhood: Neighborhood;
    };
};

interface Neighborhood {
    city: string;
    state: string;
    neighborhood: string;
    statistics: Statistics;
}

interface Statistics {
    average: number;
    lighting: number;
    movement_of_people: number;
    police_rounds: number;
}

const NeighborhoodReview: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();

    const route = useRoute<RouteProp<ParamList, "params">>();

    const neighborhood = route.params.neighborhood;
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const [hasStatistics, setHasStatistics] = useState(false);

    useEffect(() => {
        if (neighborhood.statistics) setHasStatistics(true);
    }, []);

    const ratingColor = (average: number) => {
        if (average < 3) {
            return theme.primaryImpressionRed;
        } else if (average === 3) {
            return theme.primaryImpressionOrange;
        } else return theme.primaryImpressionGreen;
    };

    const ratingColorString = (average: number) => {
        if (average < 3) {
            return "Fraco";
        } else if (average === 3) {
            return "Médio";
        } else return "Bom";
    };

    const getInfoText = (index: number) => {
        if (index === 0) return "< 40%*";
        if (index === 1) return "40% - 70%*";
        else return "> 70%*";
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text="Avaliação média" goBack />
            <KeyboardScrollView
                style={{ backgroundColor: theme.primaryBackground }}
            >
                <StatisticsNeighborhoodCard style={{ elevation: 5 }}>
                    {hasStatistics ? (
                        <>
                            <NeighborhoodText>
                                Avaliação Geral dos Usuários
                            </NeighborhoodText>
                            <TitleCity>{`${neighborhood.neighborhood} - ${neighborhood.city}`}</TitleCity>
                            <StarContainer>
                                <MaterialCommunityIcons
                                    name="star"
                                    size={scale(50)}
                                    color={theme.primaryStrongYellow}
                                />
                                <NeighborhoodAverage>
                                    {neighborhood.statistics.average}
                                </NeighborhoodAverage>
                            </StarContainer>
                            <ImpressionText>Impressões</ImpressionText>
                            <ImpressionsContainer>
                                {impressions.map((impression) => {
                                    return (
                                        <PointContainer key={impression.name}>
                                            <MaterialCommunityIcons
                                                name={impression.icon}
                                                size={scale(30)}
                                                color={ratingColor(
                                                    neighborhood.statistics[
                                                        impression.name
                                                    ]
                                                )}
                                            />
                                            <NeighborhoodTitle>
                                                Movimento:{" "}
                                                {ratingColorString(
                                                    neighborhood.statistics[
                                                        impression.name
                                                    ]
                                                )}
                                            </NeighborhoodTitle>
                                        </PointContainer>
                                    );
                                })}
                            </ImpressionsContainer>
                        </>
                    ) : (
                        <NeighborhoodText>
                            Não há estatísticas para esse bairro.
                        </NeighborhoodText>
                    )}
                </StatisticsNeighborhoodCard>
                <EvaluateButton onPress={() => navigation.navigate("Rating")}>
                    <MaterialCommunityIcons
                        name="pencil"
                        size={scale(20)}
                        color={theme.primaryWhite}
                    />
                    <EvaluateButtontText>Avaliar Bairro</EvaluateButtontText>
                </EvaluateButton>
            </KeyboardScrollView>

            <InfoModal
                style={{ height: scale(240) }}
                isOpen={isInfoOpen}
                onClosed={() => setIsInfoOpen(false)}
                swipeToClose={false}
                position="center"
                backButtonClose
            >
                <View style={{ alignItems: "center" }}>
                    <InfoTitle>Legenda:</InfoTitle>
                    <InfoContainer>
                        {[...Array(3)].map((_, index) => {
                            return (
                                <Info key={index}>
                                    <InfoColor color={ratingColor(index + 2)} />
                                    <InfoText>{getInfoText(index)}</InfoText>
                                </Info>
                            );
                        })}
                    </InfoContainer>
                    <InfoSubText style={{ marginBottom: 10 }}>
                        * Porcentagem das avaliações positivas
                    </InfoSubText>
                </View>
            </InfoModal>
        </SafeAreaView>
    );
};

export default NeighborhoodReview;

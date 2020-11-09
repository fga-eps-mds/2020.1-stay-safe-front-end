import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
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
    InfoButton,
    ImpressionsContainer,
    ImpressionsCaption,
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
    const theme = useTheme();

    const route = useRoute<RouteProp<ParamList, "params">>();

    const neighborhood = route.params.neighborhood;
    const [isInfoOpen, setIsInfoOpen] = useState(false);

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text="Avaliação média" goBack />
            <KeyboardScrollView
                style={{ backgroundColor: theme.primaryBackground }}
            >
                <StatisticsNeighborhoodCard style={{ elevation: 5 }}>
                    <NeighborhoodText>Avaliação Geral*</NeighborhoodText>
                    <InfoButton onPress={() => setIsInfoOpen(true)}>
                        <Feather
                            name="info"
                            size={scale(25)}
                            color={theme.primaryGray}
                        />
                    </InfoButton>

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

                    <ImpressionsCaption>
                        * Dados obtidos a partir das avaliações dos usuários
                    </ImpressionsCaption>
                </StatisticsNeighborhoodCard>
                <EvaluateButton>
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
                        <Info>
                            <InfoColor color={ratingColor(2)} />
                            <InfoText>{"< 40%"}*</InfoText>
                        </Info>
                        <Info>
                            <InfoColor color={ratingColor(3)} />
                            <InfoText>40% - 70%*</InfoText>
                        </Info>
                        <Info>
                            <InfoColor color={ratingColor(4)} />
                            <InfoText>{"> 70%"}*</InfoText>
                        </Info>
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

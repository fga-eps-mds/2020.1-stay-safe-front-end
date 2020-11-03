import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import { KeyboardScrollView } from "../../components/NormalForms";
import { scale } from "../../utils/scalling";
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
    const theme = useTheme();

    const route = useRoute<RouteProp<ParamList, "params">>();

    const neighborhood = route.params.neighborhood;

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
                        <PointContainer>
                            <MaterialCommunityIcons
                                name="account-multiple"
                                size={scale(30)}
                                color={ratingColor(
                                    neighborhood.statistics.movement_of_people
                                )}
                            />
                            <NeighborhoodTitle>
                                Movimento:{" "}
                                {ratingColorString(
                                    neighborhood.statistics.movement_of_people
                                )}
                            </NeighborhoodTitle>
                        </PointContainer>
                        <PointContainer>
                            <MaterialCommunityIcons
                                name="weather-sunny"
                                size={scale(30)}
                                color={ratingColor(
                                    neighborhood.statistics.lighting
                                )}
                            />
                            <NeighborhoodTitle>
                                Iluminação:{" "}
                                {ratingColorString(
                                    neighborhood.statistics.lighting
                                )}
                            </NeighborhoodTitle>
                        </PointContainer>
                        <PointContainer>
                            <MaterialCommunityIcons
                                name="car"
                                size={scale(30)}
                                color={ratingColor(
                                    neighborhood.statistics.police_rounds
                                )}
                            />
                            <NeighborhoodTitle>
                                Rondas:{" "}
                                {ratingColorString(
                                    neighborhood.statistics.police_rounds
                                )}
                            </NeighborhoodTitle>
                        </PointContainer>
                    </ImpressionsContainer>
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
        </SafeAreaView>
    );
};

export default NeighborhoodReview;

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import HeaderTitle from "../../components/HeaderTitle";
import { InfoButton } from "../../components/InfoModal";
import NeighborhoodImpressions from "../../components/NeighborhoodImpressions";
import NeighborhoodInfo from "../../components/NeighborhoodInfo";
import {
    KeyboardScrollView,
    ButtonWithIconLabel,
} from "../../components/NormalForms";
import { Neighborhood } from "../../interfaces/neighborhood";
import { scale } from "../../utils/scalling";
import {
    StarContainer,
    StatisticsNeighborhoodCard,
    NeighborhoodText,
    TitleCity,
    NeighborhoodAverage,
    ImpressionText,
} from "./styles";

type ParamList = {
    params: {
        neighborhood: Neighborhood;
    };
};

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text={neighborhood.neighborhood} goBack />
            <KeyboardScrollView
                style={{ backgroundColor: theme.primaryBackground }}
            >
                <StatisticsNeighborhoodCard style={{ elevation: 5 }}>
                    {hasStatistics ? (
                        <>
                            <NeighborhoodText>
                                Avaliação Geral dos Usuários
                            </NeighborhoodText>
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
                            <NeighborhoodImpressions
                                neighborhood={neighborhood}
                            />
                        </>
                    ) : (
                        <NeighborhoodText>
                            Não há estatísticas para esse bairro.
                        </NeighborhoodText>
                    )}
                </StatisticsNeighborhoodCard>
                <Button
                    width="70%"
                    color={theme.primaryRed}
                    style={{ marginTop: 30 }}
                    onPress={() =>
                        navigation.navigate("Rating", {
                            rating: { neighborhood },
                        })
                    }
                >
                    <MaterialCommunityIcons
                        name="pencil"
                        size={scale(18)}
                        color={theme.primaryWhite}
                    />
                    <ButtonWithIconLabel>Avaliar Bairro</ButtonWithIconLabel>
                </Button>
            </KeyboardScrollView>
            <NeighborhoodInfo
                isOpen={isInfoOpen}
                onClosed={() => setIsInfoOpen(false)}
            />
        </SafeAreaView>
    );
};

export default NeighborhoodReview;

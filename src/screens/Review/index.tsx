import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import { InfoButton } from "../../components/InfoModal";
import Loader from "../../components/Loader";
import NeighborhoodImpressions from "../../components/NeighborhoodImpressions";
import NeighborhoodInfo from "../../components/NeighborhoodInfo";
import {
    Container,
    KeyboardScrollView,
    NormalSend,
    SendLabel,
} from "../../components/NormalForms";
import { Neighborhood } from "../../interfaces/neighborhood";
import { getCityNeighborhoods } from "../../services/neighborhood";
import { scale } from "../../utils/scalling";
import {
    AverageContainer,
    NeighborhoodCard,
    NeighborhoodTitle,
    AverageNumber,
    NoStatisticsText,
    ButtonsContainer,
} from "./styles";

type ParamList = {
    params: {
        cityName: string;
        uf: string;
    };
};

const Review: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();

    const route = useRoute<RouteProp<ParamList, "params">>();

    const city = route.params.cityName;
    const uf = route.params.uf.toUpperCase();

    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [activeNeighborhoods, setActiveNeighborhoods] = useState([]);

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getNeighborhood().then((res) => setIsLoading(false));
    }, []);

    const getNeighborhood = async () => {
        const response = await getCityNeighborhoods(city, uf);

        if (response.status === 200) {
            setNeighborhoods(response.body);
        }
    };

    const _renderHeader = (
        neighborhood: Neighborhood,
        index: number,
        isActive: boolean
    ) => {
        return (
            <NeighborhoodCard
                style={{
                    borderBottomLeftRadius: isActive ? 0 : scale(16),
                    borderBottomRightRadius: isActive ? 0 : scale(16),
                    borderBottomColor: isActive
                        ? theme.primaryGray
                        : theme.primaryBackground,
                    borderBottomWidth: isActive ? 1 : 0,
                }}
            >
                <>
                    <NeighborhoodTitle>
                        {neighborhood.neighborhood}
                    </NeighborhoodTitle>
                    {neighborhood.statistics ? (
                        <AverageContainer>
                            <MaterialCommunityIcons
                                name="star"
                                size={scale(25)}
                                color={theme.primaryStrongYellow}
                            />
                            <AverageNumber>
                                {neighborhood.statistics.average}
                            </AverageNumber>
                        </AverageContainer>
                    ) : (
                        <></>
                    )}
                </>
            </NeighborhoodCard>
        );
    };

    const _renderContent = (
        neighborhood: Neighborhood,
        index: number,
        isActive: boolean
    ) => {
        return (
            <NeighborhoodCard
                style={{
                    borderTopLeftRadius: isActive ? 0 : scale(16),
                    borderTopRightRadius: isActive ? 0 : scale(16),
                    flexDirection: "column",
                }}
            >
                {neighborhood.statistics ? (
                    <NeighborhoodImpressions neighborhood={neighborhood} />
                ) : (
                    <NoStatisticsText>
                        Não há estatísticas para esse bairro.
                    </NoStatisticsText>
                )}
                <ButtonsContainer>
                    <NormalSend
                        style={{
                            width: "45%",
                            backgroundColor: theme.primaryLightBlue,
                        }}
                        onPress={() =>
                            navigation.navigate("NeighborhoodReview", {
                                neighborhood,
                            })
                        }
                    >
                        <SendLabel>Ver Bairro</SendLabel>
                    </NormalSend>
                    <NormalSend
                        style={{ width: "45%", marginLeft: "5%" }}
                        onPress={() =>
                            navigation.navigate("Rating", {
                                rating: { neighborhood },
                            })
                        }
                    >
                        <SendLabel>Avaliar</SendLabel>
                    </NormalSend>
                </ButtonsContainer>
            </NeighborhoodCard>
        );
    };

    const updateSections = (activeSections) => {
        setActiveNeighborhoods(
            activeSections.includes(undefined) ? [] : activeSections
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={`Bairros - ${city}`} goBack />
                <InfoButton
                    style={{ position: "absolute", top: scale(18) }}
                    onPress={() => setIsInfoOpen(true)}
                >
                    <Feather
                        name="info"
                        size={scale(24)}
                        color={theme.primaryGray}
                    />
                </InfoButton>
                <KeyboardScrollView>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Accordion
                            containerStyle={{ width: "100%" }}
                            sectionContainerStyle={{ marginBottom: scale(20) }}
                            sections={neighborhoods}
                            activeSections={activeNeighborhoods}
                            touchableComponent={TouchableOpacity}
                            renderHeader={_renderHeader}
                            renderContent={_renderContent}
                            onChange={updateSections}
                            expandMultiple
                        />
                    )}
                </KeyboardScrollView>
                <NeighborhoodInfo
                    isOpen={isInfoOpen}
                    onClosed={() => setIsInfoOpen(false)}
                />
            </Container>
        </SafeAreaView>
    );
};

export default Review;

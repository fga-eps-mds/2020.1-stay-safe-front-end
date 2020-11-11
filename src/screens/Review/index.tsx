import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import { Container, KeyboardScrollView } from "../../components/NormalForms";
import { getCityNeighborhoods } from "../../services/neighborhood";
import { NeighborhoodCard, NeighborhoodTitle } from "./styles";

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

type ParamList = {
    params: {
        cityName: string;
        uf: string;
    };
};

const Review: React.FC = () => {
    const navigation = useNavigation();

    const route = useRoute<RouteProp<ParamList, "params">>();

    const city = route.params.cityName;
    const uf = route.params.uf.toUpperCase();

    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [activeNeighborhoods, setActiveNeighborhoods] = useState([]);

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

    const updateSections = (activeSections) => {
        setActiveNeighborhoods(
            activeSections.includes(undefined) ? [] : activeSections
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={`Bairros - ${city}`} goBack />
                <KeyboardScrollView>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Accordion
                            containerStyle={{ width: "100%" }}
                            sections={neighborhoods}
                            activeSections={activeNeighborhoods}
                            touchableComponent={TouchableOpacity}
                            renderHeader={(neighborhood) => {
                                return (
                                    <NeighborhoodCard
                                        style={{ elevation: 5 }}
                                        key={neighborhood.neighborhood}
                                    >
                                        <NeighborhoodTitle>
                                            {neighborhood.neighborhood}
                                        </NeighborhoodTitle>
                                    </NeighborhoodCard>
                                );
                            }}
                            renderContent={(_) => <></>}
                            onChange={updateSections}
                        />
                    )}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Review;

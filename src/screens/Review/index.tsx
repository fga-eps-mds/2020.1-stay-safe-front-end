import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import { Container, KeyboardScrollView } from "../../components/NormalForms";
import { getCityNeighborhoods } from "../../services/neighborhood";
import { NeighborhoodCard, NeighborhoodTitle } from "./styles";

interface Neighborhood {
    city: string;
    state: string;
    average: number;
    lighting: number;
    movement: number;
    neighborhood: string;
    police: number;
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={`Bairros - ${city}`} goBack />
                <KeyboardScrollView>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        neighborhoods.map((neighborhood) => {
                            return (
                                <NeighborhoodCard
                                    style={{ elevation: 5 }}
                                    onPress={() =>
                                        navigation.navigate(
                                            "NeighborhoodReview",
                                            {
                                                neighborhood,
                                            }
                                        )
                                    }
                                    key={neighborhood.neighborhood}
                                >
                                    <NeighborhoodTitle>
                                        {neighborhood.neighborhood}
                                    </NeighborhoodTitle>
                                </NeighborhoodCard>
                            );
                        })
                    )}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Review;

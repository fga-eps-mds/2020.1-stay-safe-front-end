import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import ErrorModal from "../../components/ErrorModal";
import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import {
    Container,
    KeyboardScrollView,
    ButtonWithIconLabel,
} from "../../components/NormalForms";
import StatisticsCard from "../../components/StatisticsCard";
import { CityCrimes, Crimes } from "../../interfaces/statistics";
import { getAllOccurrencesOfCity } from "../../services/occurrencesSecretary";
import { scale } from "../../utils/scalling";
import { years } from "./yearsConstants";

type ParamList = {
    params: {
        city: string;
        uf: string;
    };
};

const CityStatistics: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [selectedYear, setSelectedYear] = useState("2020");
    const route = useRoute<RouteProp<ParamList, "params">>();

    const cityName = route.params.city;
    const uf = route.params.uf;

    const [isLoading, setIsLoading] = useState(false);

    const [cityStatistics, setCityStatistics] = useState<Crimes[]>([]);
    const [higherStatistic, setHigherStatistic] = useState(0);

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<[string, string]>([
        "",
        "",
    ]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [selectedYear]);

    const loadData = () => {
        setIsLoading(true);
        try {
            getOccurrences().then((response) => {});
        } catch (error) {
            setHasError(true);
            setErrorMessage(["Erro ao conectar com o servidor.", ""]);
        } finally {
            setIsLoading(false);
        }
    };

    const getOccurrences = async () => {
        const response = await getAllOccurrencesOfCity(
            uf,
            cityName,
            "1/" + selectedYear,
            "12/" + selectedYear
        );

        if (response.status === 200 && response.body.length > 0) {
            response.body[0].cities.map((city: CityCrimes) => {
                setCityStatistics(city.crimes.sort(sortCities));

                setHigherStatistic(city.crimes.sort(sortCities)[0].quantity);
            });
        } else {
            setHasError(true);

            if (response.status === 200) {
                setErrorMessage(["", "Erro ao buscar dados da cidade."]);
            } else {
                setErrorMessage([
                    "Erro ao buscar dados",
                    response.body["error"],
                ]);
            }
        }
        return response.status;
    };

    const sortCities = (a: Crimes, b: Crimes) => {
        return b.quantity - a.quantity;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={`Estatísticas - ${cityName}`} goBack />
                <KeyboardScrollView>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <StatisticsCard
                            dropdownTitle="Ano"
                            dropdownWidth="40%"
                            dropdownItems={years}
                            dropdownDefaultValue={selectedYear}
                            onChangeItem={(item) => setSelectedYear(item.value)}
                            isCityStatisticScreen
                            flatlistData={cityStatistics}
                            higherStatistic={higherStatistic}
                        />
                    )}
                    <Button
                        width="70%"
                        color={theme.primaryRed}
                        onPress={() =>
                            navigation.navigate("Neighborhoods", {
                                cityName,
                                uf,
                            })
                        }
                    >
                        <Feather
                            name="list"
                            size={scale(18)}
                            color={theme.primaryWhite}
                        />
                        <ButtonWithIconLabel>
                            Visualizar Bairros
                        </ButtonWithIconLabel>
                    </Button>
                    <Button
                        width="70%"
                        color={theme.primaryRed}
                        onPress={() =>
                            navigation.navigate("CrimeStatistics", {
                                year: selectedYear,
                                uf,
                            })
                        }
                    >
                        <MaterialCommunityIcons
                            name="sort-variant"
                            size={scale(20)}
                            color={theme.primaryWhite}
                        />
                        <ButtonWithIconLabel>
                            Comparar Estatísticas
                        </ButtonWithIconLabel>
                    </Button>
                    <ErrorModal
                        show={hasError}
                        message={errorMessage}
                        onPress={() => {
                            setHasError(false);
                            navigation.goBack();
                        }}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default CityStatistics;

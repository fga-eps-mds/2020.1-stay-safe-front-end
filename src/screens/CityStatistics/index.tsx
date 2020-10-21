import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import CircularLoader from "../../components/CircularLoader";
import HeaderTitle from "../../components/HeaderTitle";
import { Container, KeyboardScrollView } from "../../components/NormalForms";
import { getAllOccurrences } from "../../services/occurrencesSecretary";
import { scale } from "../../utils/scalling";
import {
    StatisticsCard,
    YearContainer,
    YearDropDown,
    YearTitle,
    YearTitleContainer,
    CrimeStatistics,
    SortButton,
    SortButtontText,
    CrimeContainer,
    CrimeText,
    CrimeBar,
    CrimeBarNumber,
} from "./styles";
import { years } from "./yearsConstants";

type ParamList = {
    params: {
        city: string;
    };
};

interface Data {
    [index: number]: SecretaryOccurrence;
}

interface SecretaryOccurrence {
    capture_data: string;
    cities: Array<CityCrimes>;
    period: string;
}

interface CityCrimes {
    name: string;
    crimes: Array<Crimes>;
}

interface Crimes {
    nature: string;
    quantity: number;
}

const CityStatistics: React.FC = () => {
    const theme = useTheme();

    const [selectedYear, setSelectedYear] = useState("2020");
    const route = useRoute<RouteProp<ParamList, "params">>();

    const cityName = route.params.city;

    const [data, setData] = useState<Data>([]);

    const [isLoading, setIsLoading] = useState(false);

    const [cityStatistics, setCityStatistics] = useState<Crimes[]>([]);
    const [higherStatistic, setHigherStatistic] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [selectedYear]);

    const loadData = () => {
        setIsLoading(true);
        try {
            getOccurrences().then((response) => {
                if (response === 200) {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            Alert.alert("Erro ao conectar com o servidor.");
        }
    };

    const getOccurrences = async () => {
        const response = await getAllOccurrences("df");

        if (response.status === 200) {
            setData(response.body);

            response.body.map((year: SecretaryOccurrence) => {
                if (year.period === "1/" + selectedYear) {
                    year.cities.map((city) => {
                        if (city.name === cityName) {
                            setCityStatistics(
                                city.crimes.sort(function (
                                    a: Crimes,
                                    b: Crimes
                                ) {
                                    return b.quantity - a.quantity;
                                })
                            );
                            let higher = -1;
                            let higherName = "";
                            city.crimes.map((crime: Crimes) => {
                                if (higher < crime.quantity) {
                                    higher = crime.quantity;
                                    higherName = crime.nature;
                                }
                            });
                            setHigherStatistic(
                                city.crimes.filter(
                                    (city: Crimes) => city.nature === higherName
                                )[0].quantity
                            );
                        }
                    });
                }
            });
        }
        return response.status;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={`Estatísticas - ${cityName}`} goBack />
                <KeyboardScrollView>
                    <StatisticsCard style={{ elevation: 5 }}>
                        <YearContainer>
                            <YearTitleContainer>
                                <Feather
                                    name="calendar"
                                    size={scale(18)}
                                    color={theme.primaryRed}
                                />
                                <YearTitle>Ano</YearTitle>
                            </YearTitleContainer>
                            <YearDropDown
                                items={years}
                                defaultValue={selectedYear}
                                onChangeItem={(item) =>
                                    setSelectedYear(item.value)
                                }
                            />
                        </YearContainer>
                        <CrimeStatistics loading={isLoading}>
                            {isLoading ? (
                                <CircularLoader size={40} />
                            ) : (
                                cityStatistics.map((cityStatistic) => {
                                    const percentage =
                                        (cityStatistic.quantity /
                                            higherStatistic) *
                                        100.0;

                                    if (
                                        cityStatistic.nature !==
                                        "Trafico de Entorpecentes"
                                    ) {
                                        return (
                                            <CrimeContainer
                                                key={cityStatistic.nature}
                                            >
                                                <CrimeText>
                                                    {cityStatistic.nature}
                                                </CrimeText>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <CrimeBar
                                                        percentage={percentage}
                                                    />
                                                    <CrimeBarNumber>
                                                        {cityStatistic.quantity}
                                                    </CrimeBarNumber>
                                                </View>
                                            </CrimeContainer>
                                        );
                                    }
                                })
                            )}
                        </CrimeStatistics>
                    </StatisticsCard>
                    <SortButton>
                        <MaterialCommunityIcons
                            name="sort-variant"
                            size={scale(25)}
                            color={theme.primaryWhite}
                        />
                        <SortButtontText>Ordenar Cidades</SortButtontText>
                    </SortButton>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default CityStatistics;

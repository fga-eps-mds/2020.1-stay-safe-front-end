import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    period: Year;
}

interface CityCrimes {
    [city: string]: Array<Crime>;
}

interface Crime {
    crime_nature: string;
    quantity: number;
}

interface Year {
    year: number;
}

const CityStatistics: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState("2020");
    const route = useRoute<RouteProp<ParamList, "params">>();

    const cityName = route.params.city;

    const [data, setData] = useState<Data>([]);

    const [isLoading, setIsLoading] = useState(false);

    const [cityStatistics, setCityStatistics] = useState<Crime[]>([]);
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
                if (year.period.year === Number(selectedYear)) {
                    year.cities.map((city) => {
                        if (city[cityName]) {
                            setCityStatistics(
                                city[cityName].sort(function (
                                    a: Crime,
                                    b: Crime
                                ) {
                                    return b.quantity - a.quantity;
                                })
                            );

                            let higher = -1;
                            let higherName = "";

                            city[cityName].map((crime: Crime) => {
                                if (higher < crime.quantity) {
                                    higher = crime.quantity;
                                    higherName = crime.crime_nature;
                                }
                            });

                            setHigherStatistic(
                                city[cityName].filter(
                                    (city: Crime) =>
                                        city.crime_nature === higherName
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
                                    color="#E83338"
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
                                <CircularLoader />
                            ) : (
                                cityStatistics.map((cityStatistic) => {
                                    const percentage =
                                        (cityStatistic.quantity /
                                            higherStatistic) *
                                        100.0;

                                    if (
                                        cityStatistic.crime_nature !==
                                        "Trafico de Entorpecentes"
                                    ) {
                                        return (
                                            <CrimeContainer
                                                key={cityStatistic.crime_nature}
                                            >
                                                <CrimeText>
                                                    {cityStatistic.crime_nature}
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
                            color="#FFFFFF"
                        />
                        <SortButtontText>Ordenar Cidades</SortButtontText>
                    </SortButton>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default CityStatistics;

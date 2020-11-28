import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import {
    Container,
    KeyboardScrollView,
    ButtonWithIconLabel,
} from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { getAllOccurrencesOfCity } from "../../services/occurrencesSecretary";
import { scale } from "../../utils/scalling";
import {
    StatisticsCard,
    YearContainer,
    YearDropDown,
    YearTitle,
    YearTitleContainer,
    CrimeStatistics,
    CrimeContainer,
    CrimeText,
    CrimeBar,
    CrimeBarNumber,
} from "./styles";
import { years } from "./yearsConstants";

type ParamList = {
    params: {
        city: string;
        uf: string;
    };
};

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
            getOccurrences().then((response) => {
                setIsLoading(false);
                if (response === 200) {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            setIsLoading(false);
            setHasError(true);
            setErrorMessage(["Erro ao conectar com o servidor.", ""]);
        }
    };

    const getOccurrences = async () => {
        const response = await getAllOccurrencesOfCity(
            uf,
            cityName,
            "1/" + selectedYear,
            "12/" + selectedYear
        );

        if (response.status === 200) {
            // setData(response.body);

            response.body[0].cities.map((city: CityCrimes) => {
                setCityStatistics(city.crimes.sort(sortCities));

                setHigherStatistic(city.crimes.sort(sortCities)[0].quantity);
            });
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
                                <Loader />
                            ) : (
                                cityStatistics.map((cityStatistic) => {
                                    const percentage =
                                        (cityStatistic.quantity /
                                            higherStatistic) *
                                        100.0;

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
                                })
                            )}
                        </CrimeStatistics>
                    </StatisticsCard>
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
                    <StayAlert
                        show={hasError}
                        title={errorMessage[0]}
                        message={errorMessage[1]}
                        showConfirmButton
                        confirmText="Confirmar"
                        onConfirmPressed={() => setHasError(false)}
                        onDismiss={() => setHasError(false)}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default CityStatistics;

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ErrorModal from "../../components/ErrorModal";
import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import { Container, KeyboardScrollView } from "../../components/NormalForms";
import StatisticsCard from "../../components/StatisticsCard";
import { CityCrimes } from "../../interfaces/statistics";
import { getOccurrencesByCrimeNature } from "../../services/occurrencesSecretary";
import { crimesDF, crimesSP } from "./crimesConstants";

type ParamList = {
    params: {
        year: string;
        uf: string;
    };
};

const CrimeStatistics: React.FC = () => {
    const navigation = useNavigation();

    const [selectedCrime, setSelectedCrime] = useState("Latrocínio");
    const route = useRoute<RouteProp<ParamList, "params">>();

    const year = route.params.year;
    const uf = route.params.uf;

    const [isLoading, setIsLoading] = useState(false);

    const [citiesCrimesStatistics, setCitiesCrimesStatistics] = useState<
        CityCrimes[]
    >([]);
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
    }, [selectedCrime]);

    const loadData = async () => {
        setIsLoading(true);

        try {
            await getCrimes();
        } catch (error) {
            setHasError(true);
            setErrorMessage(["Erro ao conectar com o servidor.", ""]);
        } finally {
            setIsLoading(false);
        }
    };

    const getCrimes = async () => {
        console.log(selectedCrime);
        const response = await getOccurrencesByCrimeNature(
            uf,
            selectedCrime,
            "1/" + year,
            "12/" + year,
            1
        );

        if (response.status === 200 && response.body.length > 0) {
            var orderedCities = response.body[0].cities.sort(sortCities);
            setCitiesCrimesStatistics(orderedCities);

            setHigherStatistic(orderedCities[0].crimes[0].quantity);
        } else {
            setIsLoading(false);
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

    const sortCities = (a: CityCrimes, b: CityCrimes) => {
        return b.crimes[0].quantity - a.crimes[0].quantity;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={`Comparar Estatísticas - ${year}`} goBack />
                <KeyboardScrollView>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <StatisticsCard
                            dropdownTitle="Crime"
                            dropdownWidth="55%"
                            dropdownItems={uf === "df" ? crimesDF : crimesSP}
                            dropdownDefaultValue={selectedCrime}
                            onChangeItem={(item) =>
                                setSelectedCrime(item.value)
                            }
                            flatlistData={citiesCrimesStatistics}
                            higherStatistic={higherStatistic}
                        />
                    )}
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

export default CrimeStatistics;

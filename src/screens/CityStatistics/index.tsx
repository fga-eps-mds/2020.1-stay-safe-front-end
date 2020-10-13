import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    [city: string]: {
        crime_nature: string;
        quantity: number;
    };
}

interface Year {
    year: number;
}

const CityStatistics: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState("");
    const route = useRoute<RouteProp<ParamList, "params">>();

    const cityName = route.params.city;

    const [data, setData] = useState<Data>([]);

    const [cityStatistics, setCityStatistics] = useState([]);

    useEffect(() => {
        getAllOccurrences("df").then((response) => {
            setData(response.body);
        });
    }, []);

    useEffect(() => {
        console.log("trocou data2");
    }, [data]);

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
                        <CrimeStatistics>
                            <CrimeContainer>
                                <CrimeText>Latrocínio</CrimeText>
                                <View style={{ flexDirection: "row" }}>
                                    <CrimeBar percentage={100} />
                                    <CrimeBarNumber>37</CrimeBarNumber>
                                </View>
                            </CrimeContainer>
                            <CrimeContainer>
                                <CrimeText>Roubo a Transeunte</CrimeText>
                                <View style={{ flexDirection: "row" }}>
                                    <CrimeBar percentage={95} />
                                    <CrimeBarNumber>20</CrimeBarNumber>
                                </View>
                            </CrimeContainer>
                            <CrimeContainer>
                                <CrimeText>Roubo de Veículo</CrimeText>
                                <View style={{ flexDirection: "row" }}>
                                    <CrimeBar percentage={40} />
                                    <CrimeBarNumber>15</CrimeBarNumber>
                                </View>
                            </CrimeContainer>
                            <CrimeContainer>
                                <CrimeText>Roubo de Residência</CrimeText>
                                <View style={{ flexDirection: "row" }}>
                                    <CrimeBar percentage={70} />
                                    <CrimeBarNumber>26</CrimeBarNumber>
                                </View>
                            </CrimeContainer>
                            <CrimeContainer>
                                <CrimeText>Estupro</CrimeText>
                                <View style={{ flexDirection: "row" }}>
                                    <CrimeBar percentage={13.513513513} />
                                    <CrimeBarNumber>5</CrimeBarNumber>
                                </View>
                            </CrimeContainer>
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

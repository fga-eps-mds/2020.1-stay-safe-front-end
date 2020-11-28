import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import { TouchableCard, CardContent } from "../../components/Cards";
import { dropdownStyle } from "../../components/Dropdown";
import HeaderTitle from "../../components/HeaderTitle";
import { coordinatesDF } from "../../components/HeatMap/coordinates/coordinatesDF";
import coordinatesSP from "../../components/HeatMap/coordinates/coordinatesSP.json";
import Loader from "../../components/Loader";
import { Container, NormalInput } from "../../components/NormalForms";
import { scale } from "../../utils/scalling";
import { SearchBarContainer, SearchIcon, UfDropDown } from "./styles";

interface City {
    name: string;
    uf: string;
}

const Search: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [DFCities, setDFCities] = useState<City[]>([]);
    const [SPCities, setSPCities] = useState<City[]>([]);

    const [selectedUf, setSelectedUf] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [citiesData, setCitiesData] = useState<City[]>([]);

    useEffect(() => {
        setIsLoading(true);

        coordinatesDF.sort(sortFunction);
        const citiesDf = coordinatesDF.map((city) => {
            return { name: city.name, uf: "df" };
        });
        setDFCities(citiesDf);

        const citiesSp = coordinatesSP[0].cities.map((city) => {
            return { name: city.name, uf: "sp" };
        });
        setSPCities(citiesSp);

        var allCities: City[] = citiesDf.concat(citiesSp);
        allCities.sort(sortFunction);

        setFilteredCities(allCities);
        setCitiesData(allCities);

        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (selectedUf === "df") {
            setFilteredCities(DFCities);
            setCitiesData(DFCities);
        } else if (selectedUf === "sp") {
            setFilteredCities(SPCities);
            setCitiesData(SPCities);
        }
    }, [selectedUf]);

    const sortFunction = (a, b) => {
        return ("" + a.name.normalize("NFD")).localeCompare(
            b.name.normalize("NFD")
        );
    };

    const searchFilterFunction = (text: string) => {
        if (text) {
            const newData = citiesData.filter((city) => {
                const itemData = city
                    ? city.name.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredCities(newData);
        } else {
            setFilteredCities(citiesData);
        }
        setSearch(text);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Pesquisar" />

                <SearchBarContainer>
                    <UfDropDown
                        items={[
                            { label: "DF", value: "df" },
                            { label: "SP", value: "sp" },
                        ]}
                        style={[
                            dropdownStyle,
                            { backgroundColor: theme.primaryWhite },
                        ]}
                        onChangeItem={(item) => {
                            setSelectedUf(item.value);
                            setSearch("");
                        }}
                    />

                    <View style={{ width: "73%" }}>
                        <NormalInput
                            style={{ width: "100%" }}
                            onChangeText={(text) => searchFilterFunction(text)}
                            value={search}
                            underlineColorAndroid="transparent"
                            placeholder="Buscar cidade..."
                        />
                        <SearchIcon>
                            <Feather
                                name="search"
                                size={scale(18)}
                                color={theme.primaryBlack}
                            />
                        </SearchIcon>
                    </View>
                </SearchBarContainer>

                {isLoading ? (
                    <Loader />
                ) : (
                    <FlatList
                        style={{ marginBottom: scale(30) }}
                        contentContainerStyle={{
                            width: "80%",
                            alignSelf: "center",
                        }}
                        data={filteredCities}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableCard
                                onPress={() => {
                                    navigation.navigate("CityStatistics", {
                                        city: item.name,
                                        uf: item.uf,
                                    });
                                }}
                            >
                                <CardContent>{item.name}</CardContent>
                            </TouchableCard>
                        )}
                    />
                )}
            </Container>
        </SafeAreaView>
    );
};

export default Search;

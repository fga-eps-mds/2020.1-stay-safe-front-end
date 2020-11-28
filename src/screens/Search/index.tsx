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
import {
    KeyboardScrollView,
    Container,
    NormalInput,
} from "../../components/NormalForms";
import { scale } from "../../utils/scalling";
import { UfDropDown } from "./styles";

const Search: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [DFCities, setDFCities] = useState<string[]>([]);
    const [SPCities, setSPCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState("df");

    const [search, setSearch] = useState("");
    const [filteredCities, setFilteredCities] = useState<String[]>([]);
    const [citiesData, setCitiesData] = useState<String[]>([]);

    useEffect(() => {
        coordinatesDF.sort((a, b) =>
            ("" + a.name.normalize("NFD")).localeCompare(
                b.name.normalize("NFD")
            )
        );
        const cities = coordinatesDF.map((city) => {
            return city.name;
        });
        setDFCities(cities);
        setFilteredCities(cities);
        setCitiesData(cities);
    }, []);

    useEffect(() => {
        const cities = coordinatesSP[0].cities.map((city) => {
            return city.name;
        });
        setSPCities(cities);
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

    const searchFilterFunction = (text: string) => {
        if (text) {
            const newData = citiesData.filter((city) => {
                const itemData = city ? city.toUpperCase() : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredCities(newData);
            setSearch(text);
        } else {
            setFilteredCities(citiesData);
            setSearch(text);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Pesquisar" />
                <KeyboardScrollView>
                    <View
                        style={{
                            width: "80%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <UfDropDown
                            items={[
                                { label: "DF", value: "df", selected: true },
                                { label: "SP", value: "sp" },
                            ]}
                            style={[
                                dropdownStyle,
                                { backgroundColor: theme.primaryWhite },
                            ]}
                            onChangeItem={(item) => {
                                setSelectedUf(item.value);
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
                            <View
                                style={{
                                    position: "absolute",
                                    right: "5%",
                                    top: scale(12),
                                }}
                            >
                                <Feather
                                    name="search"
                                    size={scale(18)}
                                    color={theme.primaryBlack}
                                />
                            </View>
                        </View>
                    </View>

                    <FlatList
                        style={{ width: "80%" }}
                        contentContainerStyle={{ justifyContent: "center" }}
                        data={filteredCities}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableCard
                                key={index}
                                onPress={() => {
                                    navigation.navigate("CityStatistics", {
                                        city: item,
                                        uf: selectedUf,
                                    });
                                }}
                            >
                                <CardContent>{item}</CardContent>
                            </TouchableCard>
                        )}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Search;

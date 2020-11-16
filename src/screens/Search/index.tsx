import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
import { dropdownStyle } from "../../components/Dropdown";
import HeaderTitle from "../../components/HeaderTitle";
import { coordinatesDF } from "../../components/HeatMap/coordinates/coordinatesDF";
import coordinatesSP from "../../components/HeatMap/coordinates/coordinatesSP.json";
import {
    KeyboardScrollView,
    Container,
    SendLabel,
} from "../../components/NormalForms";
import { Neighborhood } from "../../interfaces/neighborhood";
import { getCityNeighborhoods } from "../../services/neighborhood";
import { scale } from "../../utils/scalling";
import {
    UfDropDown,
    DropDownsContainer,
    CityDropDown,
    NeighborhoodDropDown,
} from "./styles";

interface DropDownItem {
    label: string;
    value: string;
}

const Search: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [DFCities, setDFCities] = useState<DropDownItem[]>([]);
    const [SPCities, setSPCities] = useState<DropDownItem[]>([]);
    const [dropdownCities, setDropdownCities] = useState<DropDownItem[]>([]);

    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [dropdownNeighborhoods, setDropdownNeighborhoods] = useState<
        DropDownItem[]
    >([]);

    const [selectedUf, setSelectedUf] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedNeighborhood, setSelectedNeighborhood] = useState("");

    useEffect(() => {
        getNeighborhood();
    }, [selectedCity]);

    const getNeighborhood = async () => {
        const response = await getCityNeighborhoods(
            selectedCity,
            selectedUf.toUpperCase()
        );

        if (response.status === 200) {
            setNeighborhoods(response.body);

            const dropdownNeighborhoods = response.body.map(
                (neighborhood: Neighborhood) => {
                    return {
                        label: neighborhood.neighborhood,
                        value: String(neighborhood.id_neighborhood),
                    };
                }
            );
            setDropdownNeighborhoods(dropdownNeighborhoods);
        }
    };

    useEffect(() => {
        const dropdownDFCities = coordinatesDF.map((city) => {
            return { label: city.name, value: city.name };
        });
        setDFCities(dropdownDFCities);
    }, []);

    useEffect(() => {
        const dropdownSPCities = coordinatesSP[0].cities.map((city) => {
            return { label: city.name, value: city.name };
        });
        setSPCities(dropdownSPCities);
    }, []);

    useEffect(() => {
        if (selectedUf === "df") setDropdownCities(DFCities);
        else if (selectedUf === "sp") setDropdownCities(SPCities);
    }, [selectedUf]);

    const handle_neighborhood_view = () => {
        const neighborhood = neighborhoods.filter((neigh: Neighborhood) => {
            return neigh.id_neighborhood === Number(selectedNeighborhood);
        })[0];

        navigation.navigate("NeighborhoodReview", { neighborhood });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Pesquisar" />
                <KeyboardScrollView>
                    <DropDownsContainer>
                        <UfDropDown
                            items={[
                                { label: "DF", value: "df" },
                                { label: "SP", value: "sp" },
                            ]}
                            style={[
                                dropdownStyle,
                                { backgroundColor: theme.primaryWhite },
                            ]}
                            onChangeItem={(item: DropDownItem) => {
                                setSelectedUf(item.value);
                            }}
                            dropdownStyle={{ height: scale(200) }}
                        />
                        <CityDropDown
                            items={dropdownCities}
                            onChangeItem={(item: DropDownItem) => {
                                setSelectedCity(item.value);
                            }}
                            style={[
                                dropdownStyle,
                                { backgroundColor: theme.primaryWhite },
                            ]}
                            disabled={selectedUf === ""}
                            searchable
                            searchablePlaceholder="Digite uma cidade..."
                            searchablePlaceholderTextColor="gray"
                            searchableError={() => <Text>Não encontrado</Text>}
                        />
                    </DropDownsContainer>
                    <NeighborhoodDropDown
                        items={dropdownNeighborhoods}
                        style={[
                            dropdownStyle,
                            { backgroundColor: theme.primaryWhite },
                        ]}
                        onChangeItem={(item: DropDownItem) => {
                            setSelectedNeighborhood(item.value);
                        }}
                        disabled={selectedCity === ""}
                        searchable
                        searchablePlaceholder="Digite um bairro..."
                        searchablePlaceholderTextColor="gray"
                        searchableError={() => <Text>Não encontrado</Text>}
                    />

                    <View style={{ flexDirection: "row" }}>
                        {selectedCity !== "" && (
                            <Button
                                width="38%"
                                color={theme.primaryRed}
                                onPress={() =>
                                    navigation.navigate("CityStatistics", {
                                        city: selectedCity,
                                        uf: selectedUf,
                                    })
                                }
                            >
                                <SendLabel>Ver cidade</SendLabel>
                            </Button>
                        )}
                        {selectedNeighborhood !== "" && (
                            <Button
                                width="38%"
                                color={theme.primaryRed}
                                onPress={handle_neighborhood_view}
                            >
                                <SendLabel>Ver bairro</SendLabel>
                            </Button>
                        )}
                    </View>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Search;

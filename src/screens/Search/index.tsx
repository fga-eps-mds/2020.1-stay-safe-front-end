import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
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
    ButtonWithIconLabel,
} from "../../components/NormalForms";
import { Neighborhood } from "../../interfaces/neighborhood";
import { getCityNeighborhoods } from "../../services/neighborhood";
import { scale } from "../../utils/scalling";
import {
    UfDropDown,
    DropDownsContainer,
    CityDropDown,
    NeighborhoodDropDown,
    NotFoundText,
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
        coordinatesDF.sort((a, b) =>
            ("" + a.name.normalize("NFD")).localeCompare(
                b.name.normalize("NFD")
            )
        );
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
                                setSelectedCity("");
                                setSelectedNeighborhood("");
                            }}
                        />
                        <CityDropDown
                            items={dropdownCities}
                            defaultValue={
                                selectedCity === "" ? null : selectedCity
                            }
                            dropDownMaxHeight={scale(300)}
                            onChangeItem={(item: DropDownItem) => {
                                setSelectedCity(item.value);
                                setSelectedNeighborhood("");
                            }}
                            style={[
                                dropdownStyle,
                                { backgroundColor: theme.primaryWhite },
                            ]}
                            disabled={selectedUf === ""}
                            searchable
                            searchablePlaceholder="Digite uma cidade..."
                            searchablePlaceholderTextColor={
                                theme.primaryDarkBlue
                            }
                            searchableStyle={{ textAlign: "center" }}
                            searchableError={() => (
                                <NotFoundText>Não encontrado</NotFoundText>
                            )}
                        />
                    </DropDownsContainer>

                    <View
                        style={{
                            marginTop: scale(15),
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <NeighborhoodDropDown
                            items={dropdownNeighborhoods}
                            dropDownMaxHeight={scale(300)}
                            defaultValue={
                                selectedNeighborhood === ""
                                    ? null
                                    : selectedNeighborhood
                            }
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
                            searchablePlaceholderTextColor={
                                theme.primaryDarkBlue
                            }
                            searchableStyle={{ textAlign: "center" }}
                            searchableError={() => (
                                <NotFoundText>Não encontrado</NotFoundText>
                            )}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            width: "80%",
                            justifyContent:
                                selectedNeighborhood !== ""
                                    ? "space-between"
                                    : "center",
                        }}
                    >
                        {selectedCity !== "" && (
                            <Button
                                width="48%"
                                color={theme.primaryRed}
                                onPress={() =>
                                    navigation.navigate("CityStatistics", {
                                        city: selectedCity,
                                        uf: selectedUf,
                                    })
                                }
                            >
                                <MaterialCommunityIcons
                                    name="city"
                                    size={scale(20)}
                                    color={theme.primaryWhite}
                                />
                                <ButtonWithIconLabel>
                                    Ver cidade
                                </ButtonWithIconLabel>
                            </Button>
                        )}
                        {selectedNeighborhood !== "" && (
                            <Button
                                width="48%"
                                color={theme.primaryDarkBlue}
                                onPress={handle_neighborhood_view}
                            >
                                <MaterialCommunityIcons
                                    name="home-city"
                                    size={scale(20)}
                                    color={theme.primaryWhite}
                                />
                                <ButtonWithIconLabel>
                                    Ver bairro
                                </ButtonWithIconLabel>
                            </Button>
                        )}
                    </View>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Search;

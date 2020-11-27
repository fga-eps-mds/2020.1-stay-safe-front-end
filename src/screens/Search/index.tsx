import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import { TouchableCard, CardContent } from "../../components/Cards";
import { dropdownStyle } from "../../components/Dropdown";
import HeaderTitle from "../../components/HeaderTitle";
import { coordinatesDF } from "../../components/HeatMap/coordinates/coordinatesDF";
import coordinatesSP from "../../components/HeatMap/coordinates/coordinatesSP.json";
import { KeyboardScrollView, Container } from "../../components/NormalForms";
import { UfDropDown } from "./styles";

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

    const [selectedUf, setSelectedUf] = useState("");

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Pesquisar" />
                <KeyboardScrollView>
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
                    />

                    <FlatList
                        style={{ width: "80%" }}
                        contentContainerStyle={{ justifyContent: "center" }}
                        data={dropdownCities}
                        renderItem={({ item }) => (
                            <TouchableCard key={item.value}>
                                <CardContent>{item.label}</CardContent>
                            </TouchableCard>
                        )}
                    />
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Search;

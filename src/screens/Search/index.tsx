import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitle from "../../components/HeaderTitle";
import { scale } from "../../utils/scalling";
import { KeyboardScrollView, Container } from "../../components/NormalForms";
import { UfDropDown, DropDownsContainer, CityDropDown, NeighborhoodDropDown } from "./styles";
import { getCityNeighborhoods } from "../../services/neighborhood";
import { ufs } from './searchConstants';
import { useTheme } from "styled-components";
import { NeighborhoodCard } from "../Review/styles";
import { NeighborhoodTitle } from "../NeighborhoodReview/styles";
import { coordinatesDF } from "../../components/HeatMap/coordinates/coordinatesDF";
import coordinatesSP from "../../components/HeatMap/coordinates/coordinatesSP.json";

interface DropDownItem {
    label: string;
    value: string;
}

const Search: React.FC = () => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const [DFCities, setDFCities] = useState<DropDownItem[]>([]);
    const [SPCities, setSPCities] = useState<DropDownItem[]>([]);
    const [dropdownCities, setDropdownCities] = useState<DropDownItem[]>([]);

    // const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     setIsLoading(true);
    //     getNeighborhood().then((res) => setIsLoading(false));
    // }, [selectedCity]);

    // const getNeighborhood = async () => {
    //     const response = await getCityNeighborhoods(selectedCity, selectedUf);

    //     if (response.status === 200) {
    //         setNeighborhoods(response.body);
    //         console.log(response.body);
    //     }
    // };

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
        if(selectedUf === "DF") setDropdownCities(DFCities);
        else if(selectedUf === "SP") setDropdownCities(SPCities);
    }, [selectedUf]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text="Pesquisar" />
                <KeyboardScrollView>
                    <DropDownsContainer>
                        <UfDropDown
                            items={ufs}
                            onChangeItem={(item: DropDownItem) => {
                                setSelectedUf(item.label);
                            }}
                            dropdownStyle={{ height: scale(200) }}
                        />
                        <CityDropDown
                            items={dropdownCities}
                            onChangeItem={(item: DropDownItem) => { 
                                setSelectedCity(item.label)
                            }}
                            style={{ width: '100%' }}
                            disabled={selectedUf === ''}
                            searchable={true}
                            searchablePlaceholder="Digite uma cidade..."
                            searchablePlaceholderTextColor="gray"
                            searchableError={() => <Text>Não encontrado</Text>}
                        />
                    </DropDownsContainer>
                {/*  <DropDownsContainer>
                        <NeighborhoodDropDown
                            items={}
                            onChangeItem={(item: Neighborhood) => {
                                setNeighborhoods(item.neighborhood);
                            }}
                            dropdownStyle={{ height: scale(200) }}
                        />
                    </DropDownsContainer> */}
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default Search;

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitle from "../../components/HeaderTitle";
import { scale } from "../../utils/scalling";
import { KeyboardScrollView } from "../../components/NormalForms";
import { UfDropDown, DropDownsContainer, CityDropDown, NeighborhoodDropDown } from "./styles";
import { getCityNeighborhoods } from "../../services/neighborhood";
import { ufs, brasilia } from './searchConstants';
import { useTheme } from "styled-components";
import { NeighborhoodCard } from "../Review/styles";
import { NeighborhoodTitle } from "../NeighborhoodReview/styles";

interface IBGEUFResponse {
    sigla: string;
    nome: string;
}

interface IBGECityResponse {
    nome: string;

}

interface DropDownItem {
    label: string;
    value: string;
}

interface Neighborhood {
    neighborhood: string;
}

const Search: React.FC = () => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const [SpCities, setSpCities] = useState<DropDownItem[]>([]);
    const [Dfcities, DfsetCities] = useState<DropDownItem[]>([]);
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');


    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getNeighborhood().then((res) => setIsLoading(false));
    }, [selectedCity]);

    const getNeighborhood = async () => {
        const response = await getCityNeighborhoods(selectedCity, selectedUf);

        if (response.status === 200) {
            setNeighborhoods(response.body);
            console.log(response.body);
        }
    };

    useEffect(() => {
        fetch(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios'
        )
            .then(async (response) => {
                const responseOfIBGE = await response.json();
                const citiesInitials = responseOfIBGE.map((city: IBGECityResponse) => {
                   return { label: city.nome, value: city.nome };
                });
                setSpCities(citiesInitials);
            });
    }, []);

    useEffect(() => { console.log({ selectedUf, selectedCity }) }, [selectedCity]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
            <HeaderTitle text="Pesquisar" />
            <KeyboardScrollView>
                {/* <SearchTabContainer>
                    <Searchbar
                        placeholder="Cidades..."
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        onIconPress={() => console.log('oi')}
                        inputStyle={{}}
                    />
                </SearchTabContainer> */}
                <DropDownsContainer>
                    {/* <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>  */}
                        <UfDropDown
                            items={ufs}
                            onChangeItem={(item: DropDownItem) => {
                                setSelectedUf(item.label);
                            }}
                            dropdownStyle={{ height: scale(200) }}
                            /* style={{ width: '50%' }} */
                        />
                    {/* </View> */}
                    {/* <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center' }} > */}
                        <CityDropDown
                            items={brasilia}
                            onChangeItem={(item: DropDownItem) =>{
                                setSelectedCity(item.label)
                            }}
                            style={{ width: '100%' }}
                            disabled={selectedUf === ''}
                            searchable={true}
                            searchablePlaceholder="Digite uma cidade..."
                            searchablePlaceholderTextColor="gray"
                            /* seachableStyle={{}} */
                            searchableError={() => <Text>Não encontrado</Text>}
                        />
                    {/* </View> */}
                </DropDownsContainer>
                <View style={{marginTop: scale(15)}}>
                    {neighborhoods.map((neighborhood) => {
                                return (
                                    <NeighborhoodCard
                                        style={{ elevation: 5 }}
                                        key={neighborhood.neighborhood}
                                    >
                                        <NeighborhoodTitle>
                                            {neighborhood.neighborhood}
                                        </NeighborhoodTitle>
                                    </NeighborhoodCard>
                                );
                                })}
                </View>
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
        </SafeAreaView>
    );
};

export default Search;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";

import { Searchbar } from 'react-native-paper';
import { scale } from "../../utils/scalling";
import { SearchTabContainer } from "./styles"

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text="Pesquise Aqui" goBack />
                <SearchTabContainer>
                    <Searchbar
                        placeholder="Pesquise"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </SearchTabContainer>
        </SafeAreaView>
    );
};

export default Search;

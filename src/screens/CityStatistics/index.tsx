import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitle from '../../components/HeaderTitle';

import { Container, KeyboardScrollView } from '../../components/NormalForms';

import { StatisticsCard } from './styles';

type ParamList = {
    params: {
        city: string;
    };
};


const CityStatistics: React.FC = () => {
    const route =  useRoute<RouteProp<ParamList, "params">>();

    const cityName = route.params.city;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle text={`Estatísticas - ${cityName}`} goBack />
                <KeyboardScrollView>
                    <StatisticsCard>
                        
                    </StatisticsCard>
                </KeyboardScrollView>
            </Container>
        </SafeAreaView>
    );
}

export default CityStatistics;

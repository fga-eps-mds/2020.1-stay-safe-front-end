import React from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "../../components/CircularLoader/styles";
import { KeyboardScrollView } from "../../components/NormalForms";
import HeaderTitle from "../../components/HeaderTitle";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { scale } from "../../utils/scalling";
import { NeighborhoodContainer,
            StarContainer,
            StatisticsNeighborhoodCard, 
            NeighborhoodTitle, 
            StatisticsNeighborhood,
            NeighborhoodText,
            ColorsContainer, 
            ColorsContainerChild} from "./styles";

type ParamList = {
    params: {
        neighborhood: Neighborhood;
    };
};
interface Neighborhood {
    city: string;
    state: string;
    average: number;
    lighting: number;
    movement: number;
    neighborhood: string;
    police: number;
};

const NeighborhoodReview: React.FC = () => {
    const theme = useTheme();

    const route = useRoute<RouteProp<ParamList, "params">>(); ;

    const neighborhood = route.params.neighborhood;

    const ratingColor = (number) => {
        if(number < 3){
            return(theme.primaryRed);
        }
        else if (number == 3){
            return(theme.heatMapOrange5);
        }
        else    
            return(theme.heatMapGreen1);
    };

    const ratingColorString = (number) => {
        if(number < 3){
            return("Fraco");
        }
        else if (number == 3){
            return("Médio");
        }
        else    
            return("Bom");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                    <HeaderTitle text={`Avaliações - ${neighborhood.neighborhood}`} goBack/>
                    <KeyboardScrollView>
                        <StatisticsNeighborhoodCard style={{ elevation: 5}}>
                            <NeighborhoodText> Avaliação Geral dos Usuários </NeighborhoodText>
                            <NeighborhoodContainer>
                                <StarContainer>
                                    <Feather 
                                        name="star"
                                        size={scale(80)}
                                        color={theme.primaryStrongYellow}
                                    />
                                <NeighborhoodTitle>Nota: {neighborhood.average} </NeighborhoodTitle>
                                </StarContainer>
                            </NeighborhoodContainer>
                                <ColorsContainer>
                                    <Feather 
                                        name="users"
                                        size={scale(40)}
                                        color={ratingColor(neighborhood.movement)}
                                    />
                                    <NeighborhoodTitle> Movimento: {ratingColorString(neighborhood.movement)}</NeighborhoodTitle>
                                    </ColorsContainer>
                                    <ColorsContainerChild>
                                        <Feather 
                                            name="sun"
                                            size={scale(40)}
                                            color={ratingColor(neighborhood.lighting)}
                                        />
                                        <NeighborhoodTitle> Iluminação: {ratingColorString(neighborhood.lighting)}</NeighborhoodTitle>
                                    </ColorsContainerChild>
                                    <ColorsContainerChild>
                                        <Feather 
                                            name="shield"
                                            size={scale(40)}
                                            color={ratingColor(neighborhood.police)}
                                        />
                                        <NeighborhoodTitle> Rondas Policiais: {ratingColorString(neighborhood.police)}</NeighborhoodTitle>
                                    </ColorsContainerChild>
                                    
                                   
                                
                            <StatisticsNeighborhood>
                            </StatisticsNeighborhood>
                        </StatisticsNeighborhoodCard>
                    </KeyboardScrollView>
            </Container>
                

        </SafeAreaView>
    );
}

export default NeighborhoodReview;
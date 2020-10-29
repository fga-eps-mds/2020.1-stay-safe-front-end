import React from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "../../components/CircularLoader/styles";
import { KeyboardScrollView, Title } from "../../components/NormalForms";
import HeaderTitle from "../../components/HeaderTitle";
import { NeighborhoodContainer } from "./styles";

interface Neighborhood {
    city: string;
    state: string;
    average: number;
    lighting: number;
    movement: number;
    neighborhood: string;
    police: number;
};

interface NeighborhoodProps {
  neighborhood: Neighborhood;
}

const NeighborhoodReview: React.FC<NeighborhoodProps> = ({neighborhood}) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
           <Container>
                <HeaderTitle text="Avaliações - Cidade" goBack/>
                <KeyboardScrollView>
                  <NeighborhoodContainer>
                    {console.log(neighborhood)}
                      <Title> {neighborhood.average} </Title>
                  </NeighborhoodContainer>
                    
                </KeyboardScrollView>
           </Container>
               

        </SafeAreaView>
    );
}

export default NeighborhoodReview;
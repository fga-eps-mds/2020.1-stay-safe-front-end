import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTitle from "../../components/HeaderTitle";

import {
    SendLabel,
    NormalSend
} from "../../components/NormalForms";

import {
    Container,
    LocalName,
    StarsRating,
    TellUs,
    Detail,
    DetailLabel
} from "./styles";

import {
    goodDetailsItems,
    badDetailsItems
} from './detailsConstants';

const Rating: React.FC = () => {

    const [isEditing, setIsEditing] = useState(true);

    const [rating, setRating] = useState(3);
    const [detail, setDetail] = useState('');

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const isDetail = (option: string) => {
        return option === detail
    }

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderTitle
                    text={
                        isEditing ? "Editar Avaliação" : "Avaliar Bairro"
                    }
                    goBack
                />

                <LocalName>Setor Leste - Gama</LocalName>

                <StarsRating
                    defaultRating={rating}
                    onFinishRating={(rate) => setRating(rate)}
                />

                <TellUs>Conte-nos o por quê:</TellUs>

                {rating >= 3 ?
                    goodDetailsItems.map((detail, key) => (
                        <Detail
                            key={key}
                            onPress={() => setDetail(detail.value)}
                            selected={isDetail(detail.value)}
                        >
                            <DetailLabel>
                                {detail.label}
                            </DetailLabel>
                        </Detail>
                    )) :
                    badDetailsItems.map((detail, key) => (
                        <Detail
                            key={key}
                            onPress={() => setDetail(detail.value)}
                            selected={isDetail(detail.value)}
                        >
                            <DetailLabel>
                                {detail.label}
                            </DetailLabel>
                        </Detail>
                    ))
                }

                <NormalSend onPress={() => {}}>
                    <SendLabel>Salvar</SendLabel>
                </NormalSend>
            </Container>
        </SafeAreaView>
    );
};

export default Rating;
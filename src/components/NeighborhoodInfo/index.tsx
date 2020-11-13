import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";

import { scale } from "../../utils/scalling";
import {
    InfoModal,
    InfoTitle,
    InfoContainer,
    InfoSubText,
    Info,
    InfoColor,
    InfoText,
} from "../InfoModal";

interface NeighborhoodInfoProps {
    isOpen: boolean;
    onClosed: () => void;
}

const NeighborhoodInfo: React.FC<NeighborhoodInfoProps> = ({
    isOpen,
    onClosed,
}) => {
    const theme = useTheme();

    const getInfoText = (index: number) => {
        let text = "";

        if (index === 0) text = "Sem dados";
        else if (index === 1) text = "< 40%*";
        else if (index === 2) text = "40% - 70%*";
        else if (index === 3) text = "> 70%*";

        return text;
    };

    const getInfoColor = (index: number) => {
        let color = theme.primaryBackground;

        if (index === 0) color = theme.primaryGray;
        else if (index === 1) color = theme.primaryImpressionRed;
        else if (index === 2) color = theme.primaryImpressionOrange;
        else if (index === 3) color = theme.primaryImpressionGreen;

        return color;
    };

    return (
        <InfoModal
            style={{ height: scale(270) }}
            isOpen={isOpen}
            onClosed={onClosed}
            swipeToClose={false}
            position="center"
            backButtonClose
        >
            <View style={{ alignItems: "center" }}>
                <InfoTitle>Legenda:</InfoTitle>
                <InfoContainer>
                    {[...Array(4)].map((_, index) => {
                        return (
                            <Info key={index}>
                                <InfoColor color={getInfoColor(index)} />
                                <InfoText>{getInfoText(index)}</InfoText>
                            </Info>
                        );
                    })}
                </InfoContainer>
                <InfoSubText style={{ marginBottom: 10 }}>
                    * Porcentagem das avaliações positivas
                </InfoSubText>
            </View>
        </InfoModal>
    );
};

export default NeighborhoodInfo;

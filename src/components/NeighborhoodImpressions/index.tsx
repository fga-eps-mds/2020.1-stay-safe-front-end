import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "styled-components";

import { Neighborhood } from "../../interfaces/neighborhood";
import { scale } from "../../utils/scalling";
import { impressions } from "./impressions";
import { ImpressionText, ImpressionsContainer, Impression } from "./styles";

interface ImpressionsProps {
    neighborhood: Neighborhood;
}

const NeighborhoodImpressions: React.FC<ImpressionsProps> = ({
    neighborhood,
}) => {
    const theme = useTheme();

    const ratingColor = (average: number) => {
        let color = theme.primaryGray;

        if (average < 2) color = theme.primaryImpressionRed;
        else if (average === 2) color = theme.primaryImpressionOrange;
        else if (average === 3) color = theme.primaryImpressionGreen;

        return color;
    };

    const ratingText = (average: number) => {
        let text = "Sem dados";

        if (average < 2) text = "Fraco";
        else if (average === 2) text = "Médio";
        else if (average === 3) text = "Bom";

        return text;
    };

    return (
        <ImpressionsContainer>
            {impressions.map((impression) => {
                return (
                    <Impression key={impression.name}>
                        <MaterialCommunityIcons
                            name={impression.icon}
                            size={scale(30)}
                            color={ratingColor(
                                neighborhood.statistics[impression.name]
                            )}
                        />
                        <ImpressionText>
                            {`${impression.label}: ${ratingText(
                                neighborhood.statistics[impression.name]
                            )}`}
                        </ImpressionText>
                    </Impression>
                );
            })}
        </ImpressionsContainer>
    );
};

export default NeighborhoodImpressions;

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
        if (average < 3) {
            return theme.primaryImpressionRed;
        } else if (average === 3) {
            return theme.primaryImpressionOrange;
        } else return theme.primaryImpressionGreen;
    };

    const ratingColorString = (average: number) => {
        if (average < 3) {
            return "Fraco";
        } else if (average === 3) {
            return "Médio";
        } else return "Bom";
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
                            {`${impression.label}: ${ratingColorString(
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

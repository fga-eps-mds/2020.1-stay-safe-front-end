import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Marker } from "react-native-maps";
import { useTheme } from "styled-components";

import DarkLogo from "../../img/logo-thief-dark.svg";
import Logo from "../../img/logo-thief.svg";
import { Occurrence } from "../../interfaces/occurrence";
import { crimesColors } from "../../screens/Home/searchOptions";
import { scale } from "../../utils/scalling";

interface StayMarkerProps {
    occurrence: Occurrence;
}

const StayMarker: React.FC<StayMarkerProps> = ({ occurrence }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const getPinColor = (occurrence: Occurrence) => {
        return crimesColors.filter(
            (op) => op.name === occurrence.occurrence_type
        )[0].color;
    };

    return (
        <Marker
            key={occurrence.id_occurrence}
            coordinate={{
                latitude: occurrence.location[0],
                longitude: occurrence.location[1],
            }}
            onPress={() =>
                navigation.navigate("OccurrenceDetails", {
                    occurrence,
                })
            }
            tracksViewChanges={false}
        >
            {theme.type === "dark" ? (
                <DarkLogo
                    width={scale(38)}
                    height={scale(38)}
                    fill={getPinColor(occurrence)}
                />
            ) : (
                <Logo
                    width={scale(38)}
                    height={scale(38)}
                    fill={getPinColor(occurrence)}
                />
            )}
        </Marker>
    );
};

export default StayMarker;

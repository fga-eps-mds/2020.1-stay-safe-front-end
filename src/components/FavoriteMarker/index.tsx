import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Marker } from "react-native-maps";
import { useTheme } from "styled-components";

import DarkLogo from "../../img/logo-thief-dark.svg";
import Logo from "../../img/logo-thief.svg";
import { FavoritePlace } from "../../interfaces/favoriteplaces";
import { scale } from "../../utils/scalling";

interface FavoriteMarkerProps {
    favoriteplace: FavoritePlace;
}

const FavoriteMarker: React.FC<FavoriteMarkerProps> = ({ favoriteplace }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    return (
        <Marker
            key={favoriteplace.id_place}
            coordinate={{
                latitude: favoriteplace.latitude,
                longitude: favoriteplace.longitude,
            }}
            onPress={
                () => {}
                // navigation.navigate("OccurrenceDetails", {
                //     occurrence,
                // })
            }
            tracksViewChanges={false}
        >
            {theme.type === "dark" ? (
                <DarkLogo width={scale(38)} height={scale(38)} />
            ) : (
                <Logo width={scale(38)} height={scale(38)} />
            )}
        </Marker>
    );
};

export default FavoriteMarker;

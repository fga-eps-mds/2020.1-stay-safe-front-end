import React from "react";
import { Marker } from "react-native-maps";
import { useTheme } from "styled-components";

import FavoriteLogo from "../../img/favorite-place-pin.svg";
import { FavoritePlace } from "../../interfaces/favoriteplaces";
import { scale } from "../../utils/scalling";

interface FavoriteMarkerProps {
    favoriteplace: FavoritePlace;
}

const FavoriteMarker: React.FC<FavoriteMarkerProps> = ({ favoriteplace }) => {
    const theme = useTheme();

    return (
        <Marker
            key={favoriteplace.id_place}
            coordinate={{
                latitude: favoriteplace.latitude,
                longitude: favoriteplace.longitude,
            }}
            description={favoriteplace.name}
            onPress={() => console.log(favoriteplace.name)}
            tracksViewChanges={false}
        >
            {theme.type === "dark" ? (
                <FavoriteLogo width={scale(40)} height={scale(40)} />
            ) : (
                <FavoriteLogo width={scale(40)} height={scale(40)} />
            )}
        </Marker>
    );
};

export default FavoriteMarker;

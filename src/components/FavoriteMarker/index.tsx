import React from "react";
import { Marker } from "react-native-maps";

import FavoriteLogo from "../../img/favorite-pin.svg";
import { FavoritePlace } from "../../interfaces/favoriteplaces";
import { scale } from "../../utils/scalling";

// Oi galera

interface FavoriteMarkerProps {
    favoriteplace: FavoritePlace;
}

const FavoriteMarker: React.FC<FavoriteMarkerProps> = ({ favoriteplace }) => {
    return (
        <Marker
            key={favoriteplace.id_place}
            coordinate={{
                latitude: favoriteplace.latitude,
                longitude: favoriteplace.longitude,
            }}
            description={favoriteplace.name}
            tracksViewChanges={false}
        >
            <FavoriteLogo width={scale(40)} height={scale(40)} />
        </Marker>
    );
};

export default FavoriteMarker;

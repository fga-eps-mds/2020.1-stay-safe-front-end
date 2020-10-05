import React from "react";
import { Polygon } from "react-native-maps";
import { coordinates } from "./coordinates";
import { StayNormalMap } from "../Home/styles";

interface CoordinateCitiesDF {
    name: string;
    color: string;
    coordinates: Array<Coordinate>;
}

interface Coordinate {
    longitude: number;
    latitude: number;
}

const HeatMap = () => {
    return (
        <StayNormalMap
            loadingEnabled={true}
            initialRegion={{
                latitude: -15.780311,
                longitude: -47.768043,
                latitudeDelta: 1,
                longitudeDelta: 1,
            }}
        >
            {coordinates.map((coordinate: CoordinateCitiesDF) => {
                return (
                    <Polygon
                        key={coordinate.name}
                        coordinates={coordinate.coordinates.map(
                            (coordinate) => coordinate
                        )}
                        strokeColor="transparent"
                        fillColor={coordinate.color}
                        tappable
                        onPress={() => console.log(coordinate.name)}
                    />
                );
            })}
        </StayNormalMap>
    );
};

export default HeatMap;

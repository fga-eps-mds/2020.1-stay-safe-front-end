import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, {
    Heatmap,
    Polygon,
    PROVIDER_GOOGLE,
    Marker,
} from "react-native-maps";
import { coordinates } from "./coordinates";
import LoggedInModal from "../../components/LoggedInModal";
import { useNavigation } from "@react-navigation/native";

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
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                loadingEnabled={true}
                initialRegion={{
                    latitude: -15.9897883,
                    longitude: -48.0464073,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0031,
                }}
                style={{ flex: 1 }}
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
                        />
                    );
                })}
            </MapView>

            <LoggedInModal navObject={navigation} />
        </SafeAreaView>
    );
};

export default HeatMap;

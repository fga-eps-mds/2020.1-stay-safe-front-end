import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Polygon } from "react-native-maps";
import { useTheme } from "styled-components";

import { StayNormalMap } from "../../screens/Home/styles";
import staySafeDarkMapStyle from "../../styles/staySafeDarkMapStyle";
import { coordinates } from "./coordinates";

interface CoordinateCitiesDF {
    name: string;
    color: string;
    coordinates: Array<Coordinate>;
}

interface Coordinate {
    longitude: number;
    latitude: number;
}

interface HeatMapProps {
    secretaryOccurrences: Array<CityCrimes>;
}

interface CityCrimes {
    name: string;
    crimes: Array<Crime>;
}

interface Crime {
    nature: string;
    quantity: number;
    classification: number;
}

interface CitiesCrimes {
    name: string;
    nature: string;
    quantity: number;
    classification: number;
    color?: string;
}

const HeatMap: React.FC<HeatMapProps> = ({ secretaryOccurrences }) => {
    const navigation = useNavigation();
    const theme = useTheme();

    const [citiesCrimes, setCitiesCrimes] = useState<CitiesCrimes[]>([]);

    const [isSelected, setIsSelected] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("");

    useEffect(() => {
        if (secretaryOccurrences) {
            setCitiesCrimes(
                secretaryOccurrences.map((city) => {
                    const crime = {
                        name: city.name,
                        nature: city.crimes[0].nature,
                        quantity: city.crimes[0].quantity,
                        classification: city.crimes[0].classification,
                        color: getHeatColor(city.crimes[0].classification),
                    };

                    return crime;
                })
            );
        }
    }, []);

    const getHeatColor = (classification: number) => {
        if (classification === 1) return theme.heatMapGreen1;
        else if (classification === 2) return theme.heatMapYellow2;
        else if (classification === 3) return theme.heatMapOrange3;
        else if (classification === 4) return theme.heatMapOrange4;
        else if (classification === 5) return theme.heatMapOrange5;
        else if (classification === 6) return theme.heatMapRed6;
    };

    return (
        <StayNormalMap
            loadingEnabled
            initialRegion={{
                latitude: -15.780311,
                longitude: -47.768043,
                latitudeDelta: 1,
                longitudeDelta: 1,
            }}
            customMapStyle={theme.type === "dark" ? staySafeDarkMapStyle : []}
        >
            {coordinates.map((coordinate: CoordinateCitiesDF) => {
                const cityColor = citiesCrimes.filter(
                    (cityCrimes) => cityCrimes.name === coordinate.name
                );

                let color = theme.heatMapOrange3;

                if (cityColor.length === 0) {
                    color = coordinate.color;
                } else {
                    if (cityColor[0].color) color = cityColor[0].color;
                }

                if (isSelected && coordinate.name === selectedRegion) {
                    const lastProp = color.split(", ");
                    color = "";

                    lastProp.pop();

                    color += lastProp[0];
                    color += ", ";
                    color += lastProp[1];
                    color += ", ";
                    color += lastProp[2];
                    color += ", ";
                    color += "0.2)";
                }

                return (
                    <Polygon
                        key={coordinate.name}
                        coordinates={coordinate.coordinates.map(
                            (coordinate) => coordinate
                        )}
                        strokeColor={theme.primaryBlack}
                        fillColor={color}
                        tappable
                        onPress={() => {
                            setIsSelected(true);
                            setSelectedRegion(coordinate.name);
                            setTimeout(() => {
                                setIsSelected(false);
                                navigation.navigate("CityStatistics", {
                                    city: coordinate.name,
                                    uf: "df",
                                });
                            }, 1000);
                        }}
                    />
                );
            })}
        </StayNormalMap>
    );
};

export default HeatMap;

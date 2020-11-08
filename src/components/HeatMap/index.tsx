import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Polygon } from "react-native-maps";
import { useTheme } from "styled-components";

import { StayNormalMap } from "../../screens/Home/styles";
import staySafeDarkMapStyle from "../../styles/staySafeDarkMapStyle";
import Loader from "../Loader";
import { coordinatesDF } from "./coordinates/coordinatesDF";
import coordinatesSP from "./coordinates/coordinatesSP.json";

interface Coordinate {
    longitude: number;
    latitude: number;
}

interface HeatMapProps {
    secretaryOccurrences: Array<CityCrimes>;
    city: string;
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

interface CityCoordinate {
    name: string;
    coordinates: Array<Array<number | LatLng>>;
}

interface LatLng {
    latitude: number;
    longitude: number;
}

const HeatMap: React.FC<HeatMapProps> = ({ secretaryOccurrences, city }) => {
    const navigation = useNavigation();
    const theme = useTheme();

    const [citiesCrimes, setCitiesCrimes] = useState<CitiesCrimes[]>([]);

    const [isSelected, setIsSelected] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("");

    const [coordinates, setCoordinates] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (city === "df") {
            setCrimes();
            setCoordinates(coordinatesDF);
            setIsLoading(false);
        } else {
            setCrimes();
            getSpCoordinates().then((res) => setIsLoading(false));
        }
    }, []);

    const getSpCoordinates = async () => {
        if (isNaN(coordinatesSP[0].cities[0].coordinates[0].latitude)) {
            setCoordinates(
                coordinatesSP[0].cities.map((cityCoord: CityCoordinate) => {
                    cityCoord.coordinates = cityCoord.coordinates.map(
                        (coordinateCity) => {
                            return {
                                longitude: Number(coordinateCity[0]),
                                latitude: Number(coordinateCity[1]),
                            };
                        }
                    );
                    return {
                        name: cityCoord.name,
                        coordinates: cityCoord.coordinates,
                    };
                })
            );
        } else {
            setCoordinates(coordinatesSP[0].cities);
        }
    };

    const setCrimes = () => {
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
    };

    const getHeatColor = (classification: number) => {
        let color = "";
        if (classification === 1) color = theme.heatMapGreen1;
        else if (classification === 2) color = theme.heatMapYellow2;
        else if (classification === 3) color = theme.heatMapOrange3;
        else if (classification === 4) color = theme.heatMapOrange4;
        else if (classification === 5) color = theme.heatMapOrange5;
        else if (classification === 6) color = theme.heatMapRed6;

        return color;
    };

    const getColorIfIsSelected = (coordinate: CityCoordinate) => {
        const cityColor = citiesCrimes.filter(
            (cityCrimes) => cityCrimes.name === coordinate.name
        );

        let color = theme.heatMapOrange3;

        if (cityColor[0].color) color = cityColor[0].color;

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

        return color;
    };

    return (
        <>
            <StayNormalMap
                loadingEnabled
                initialRegion={{
                    latitude: city === "df" ? -15.780311 : -23.6821604,
                    longitude: city === "df" ? -47.768043 : -46.8754825,
                    latitudeDelta: 3,
                    longitudeDelta: 3,
                }}
                customMapStyle={
                    theme.type === "dark" ? staySafeDarkMapStyle : []
                }
            >
                {coordinates.map((coordinate: CityCoordinate) => {
                    if (
                        coordinate.coordinates[0].latitude &&
                        coordinate.coordinates[0].longitude
                    ) {
                        return (
                            <Polygon
                                key={coordinate.name}
                                coordinates={coordinate.coordinates}
                                strokeColor={theme.primaryBlack}
                                fillColor={getColorIfIsSelected(coordinate)}
                                tappable
                                onPress={() => {
                                    setIsSelected(true);
                                    setSelectedRegion(coordinate.name);
                                    setTimeout(() => {
                                        setIsSelected(false);
                                        navigation.navigate("CityStatistics", {
                                            city: coordinate.name,
                                            uf: city,
                                        });
                                    }, 1000);
                                }}
                            />
                        );
                    }
                })}
            </StayNormalMap>
            {(isLoading || isSelected) && <Loader />}
        </>
    );
};

export default HeatMap;

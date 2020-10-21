import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Polygon } from "react-native-maps";
import { useTheme } from "styled-components";

import { StayNormalMap } from "../Home/styles";
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
}

interface CitiesCrimes {
    name: string;
    nature: string;
    quantity: number;
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
            const crimesUpdated: CitiesCrimes[] = [];
            let nature = "";

            secretaryOccurrences.forEach((city) => {
                nature = city.crimes[0].nature;

                const crime = {
                    name: city.name,
                    nature: city.crimes[0].nature,
                    quantity: city.crimes[0].quantity,
                };
                crimesUpdated.push(crime);
            });

            createHeatScale(crimesUpdated, nature);
        }
    }, []);

    const createHeatScale = (crimesUpdated: CitiesCrimes[], nature: string) => {
        const citiesColors: CitiesCrimes[] = [];
        crimesUpdated.map((city) => {
            if (nature === "Latrocínio") {
                if (city.quantity === 0) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapGreen6,
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity === 1) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapOrange3,
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapRed1,
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (nature === "Estupro") {
                if (city.quantity <= 2) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapGreen6,
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 2 && city.quantity <= 5) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapOrange3,
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapRed1,
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (nature === "Roubo a Transeunte") {
                if (city.quantity <= 100) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapGreen6,
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 100 && city.quantity <= 200) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapOrange3,
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapRed1,
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (nature === "Roubo de Veículo") {
                if (city.quantity <= 5) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapGreen6,
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 5 && city.quantity <= 20) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapOrange3,
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapRed1,
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (nature === "Roubo de Residência") {
                if (city.quantity <= 2) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapGreen6,
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 2 && city.quantity <= 5) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapOrange3,
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapRed1,
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (nature === "Furto a Transeunte") {
                if (city.quantity <= 5) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapGreen6,
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 5 && city.quantity <= 15) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapOrange3,
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapRed1,
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (nature === "Furto de Veículo") {
                if (city.quantity <= 20) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapGreen6,
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 20 && city.quantity <= 50) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapOrange3,
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        nature: city.nature,
                        color: theme.heatMapRed1,
                    };
                    citiesColors.push(cityCoordinate);
                }
            }
        });

        setCitiesCrimes(citiesColors);
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

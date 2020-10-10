import React, { useEffect, useState } from "react";
import { Polygon } from "react-native-maps";

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
    secretaryOccurrences: Array<SecretaryOccurrence>;
}

interface SecretaryOccurrence {
    capture_data: string;
    cities: Array<CityCrimes>;
    period: Year;
}

interface CityCrimes {
    [city: string]: Crime[];
}

interface Crime {
    crime_nature: string;
    quantity: number;
}

interface Year {
    year: number;
}

interface CitiesCrimes {
    name: string;
    crime_nature: string;
    quantity: number;
    color?: string;
}

const HeatMap: React.FC<HeatMapProps> = ({ secretaryOccurrences }) => {
    const [citiesCrimes, setCitiesCrimes] = useState<CitiesCrimes[]>([]);

    useEffect(() => {
        if (secretaryOccurrences && secretaryOccurrences[1]) {
            const cities = coordinates.map((coordinate) => {
                return coordinate.name;
            });

            const crimesUpdated: CitiesCrimes[] = [];
            let crime_nature = "";

            secretaryOccurrences[1].cities.forEach((cityCrimes) =>
                cities.forEach((city) => {
                    if (cityCrimes[city]) {
                        cityCrimes[city].forEach((crimes) => {
                            crime_nature = crimes.crime_nature;
                            const crime = {
                                name: city,
                                crime_nature: crimes.crime_nature,
                                quantity: crimes.quantity,
                            };
                            crimesUpdated.push(crime);
                        });
                    }
                })
            );

            createHeatScale(crimesUpdated, crime_nature);
        }
    }, []);

    const createHeatScale = (
        crimesUpdated: CitiesCrimes[],
        crime_nature: string
    ) => {
        const citiesColors: CitiesCrimes[] = [];
        crimesUpdated.map((city) => {
            if (crime_nature === "Latrocinio") {
                if (city.quantity === 0) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(101, 239, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 0 && city.quantity <= 2) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(232, 140, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(239, 0, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (crime_nature === "Estupro") {
                if (city.quantity <= 10) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(101, 239, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 10 && city.quantity <= 30) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(232, 140, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(239, 0, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (crime_nature === "Roubo a Transeunte") {
                if (city.quantity <= 500) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(101, 239, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 500 && city.quantity <= 1800) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(232, 140, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(239, 0, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (crime_nature === "Roubo de Veiculo") {
                if (city.quantity <= 60) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(101, 239, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 60 && city.quantity <= 200) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(232, 140, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(239, 0, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                }
            } else if (crime_nature === "Roubo de Residencia") {
                if (city.quantity <= 15) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(101, 239, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else if (city.quantity > 15 && city.quantity <= 50) {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(232, 140, 0, 0.6)",
                    };
                    citiesColors.push(cityCoordinate);
                } else {
                    const cityCoordinate = {
                        name: city.name,
                        quantity: city.quantity,
                        crime_nature: city.crime_nature,
                        color: "rgba(239, 0, 0, 0.6)",
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

                let color = "rgba(239, 91, 0, 0.6)";

                if (cityColor.length === 0) {
                    color = coordinate.color;
                } else {
                    if (cityColor[0].color) color = cityColor[0].color;
                }

                return (
                    <Polygon
                        key={coordinate.name}
                        coordinates={coordinate.coordinates.map(
                            (coordinate) => coordinate
                        )}
                        strokeColor="#000"
                        fillColor={color}
                        tappable
                        onPress={() => console.log(coordinate.name)}
                    />
                );
            })}
        </StayNormalMap>
    );
};

export default HeatMap;

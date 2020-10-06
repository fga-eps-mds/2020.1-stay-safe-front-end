import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import {
    useFocusEffect,
    useRoute,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Marker, MapEvent } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import LoggedInModal from "../../components/LoggedInModal";
import { NormalSend, SendLabel } from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { getAllUsersOccurrences } from "../../services/occurrences";
import { getOccurrencesByCrimeNature } from "../../services/occurrencesSecretary";
import { getUser } from "../../services/users";
import { scale } from "../../utils/scalling";
import HeatMap from "../HeatMap";
import { searchOptions } from "./searchOptions";
import {
    FilterButton,
    FilterModal,
    StayNormalMap,
    ButtonOptionContainer,
    ButtonOptionText,
    OptionCircleButton,
    FilterTitle,
} from "./styles";

type ParamList = {
    params: {
        showReportModal: boolean;
    };
};

interface Occurrence {
    id_occurrence: number;
    location: [number, number];
    gun: string;
    occurrence_date_time: string;
    register_date_time: string;
    occurrence_type: string;
    physical_aggression: boolean;
    police_report: boolean;
    victim: boolean;
}

interface SecretaryOccurrence {
    capture_data: string;
    cities: Array<CityCrimes>;
    period: Year;
}

interface CityCrimes {
    [city: string]: {
        crime_nature: string;
        quantity: number;
    };
}

interface Year {
    year: number;
}

const Home = () => {
    const route = useRoute<RouteProp<ParamList, "params">>();
    const navigation = useNavigation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    const [secretaryOccurrences, setSecretaryOccurrences] = useState([]);

    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useFocusEffect(
        useCallback(() => {
            setIsReporting(false);
        }, [])
    );

    useFocusEffect(() => {
        if (route.params) {
            setIsModalOpen(route.params.showReportModal);
        }
    });

    const handleFilterHeatMap = () => {
        async function loadData() {
            const option = searchOptions[selectedOption - 1];

            const response = await getOccurrencesByCrimeNature(
                "df",
                option.label
            );

            if (response.status === 200) {
                const responseOfYear2019 = response.body.map(
                    (year: SecretaryOccurrence) => {
                        if (year.period.year === 2019) {
                            return year;
                        }
                    }
                );

                setSecretaryOccurrences(responseOfYear2019);
                return "Stay Safe";
            }
        }

        if (selectedOption > 0) {
            loadData().then((res) => {
                setIsFilterOpen(false);
            });
        } else {
            setIsWarningOpen(true);
        }
    };

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem("username").then((username) => {
                getUser(username).then((response) => {
                    if (response.status === 200) {
                        setIsLogged(true);
                    } else {
                        setIsLogged(false);
                    }
                });
            });
        }, [route.params?.showReportModal])
    );

    useFocusEffect(
        useCallback(() => {
            getAllUsersOccurrences().then((response) => {
                setOccurrences(response.body);
            });
        }, [])
    );

    // Function to use on modal closed.
    const handleClosedModal = () => {
        setIsModalOpen(false);
        navigation.setParams({ showReportModal: null });
    };

    const handleReportingCoordinatesOnMap = (e: MapEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;

        if (isReporting) {
            setIsReporting(false);
            navigation.navigate("Occurrence", { latitude, longitude });
        }
    };

    const handleSelectOption = (id: number) => {
        if (selectedOption === id) {
            setSelectedOption(0);
        } else {
            setSelectedOption(id);
        }
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!isFilterOpen && (
                <FilterButton
                    style={{
                        elevation: 20,
                    }}
                    onPress={() => setIsFilterOpen(true)}
                >
                    <Feather name="filter" size={scale(30)} color="#C8C8C8" />
                </FilterButton>
            )}
            {!isLogged && <LoggedInModal navObject={navigation} />}
            {selectedOption > 0 && !isFilterOpen ? (
                <HeatMap secretaryOccurrences={secretaryOccurrences} />
            ) : (
                <StayNormalMap
                    loadingEnabled
                    initialRegion={{
                        latitude: -15.780311,
                        longitude: -47.768043,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    }}
                    onPress={(e) => handleReportingCoordinatesOnMap(e)}
                >
                    {occurrences?.map((occurrence: Occurrence) => {
                        return (
                            <Marker
                                key={occurrence.id_occurrence}
                                coordinate={{
                                    latitude: occurrence.location[0],
                                    longitude: occurrence.location[1],
                                }}
                            />
                        );
                    })}
                </StayNormalMap>
            )}
            <StayAlert
                show={isModalOpen && isLogged}
                title="Reportar Ocorrência"
                message="Toque para selecionar o local no mapa com o marcador"
                showConfirmButton
                confirmText="Entendido"
                onConfirmPressed={() => {
                    handleClosedModal();
                    setIsReporting(true);
                }}
                onDismiss={() => handleClosedModal()}
            />
            <StayAlert
                show={isWarningOpen}
                title="Opa!"
                message={
                    "Selecione uma opção de filtro.\nPara voltar ao mapa, clique fora da janela."
                }
                showConfirmButton
                confirmText="Entendido"
                onConfirmPressed={() => setIsWarningOpen(false)}
                onDismiss={() => setIsWarningOpen(false)}
            />
            <FilterModal
                style={{ elevation: 20 }}
                isOpen={isFilterOpen}
                onClosed={() => setIsFilterOpen(false)}
                swipeToClose={false}
                position="top"
                backdropOpacity={0}
                backButtonClose
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <FilterTitle>Filtrar crimes</FilterTitle>
                </View>
                {searchOptions.map((option) => {
                    return (
                        <ButtonOptionContainer key={option.id}>
                            <OptionCircleButton
                                onPress={() => handleSelectOption(option.id)}
                            >
                                <Feather
                                    name={
                                        selectedOption === option.id
                                            ? "check-circle"
                                            : "circle"
                                    }
                                    size={scale(20)}
                                    color="#000000"
                                />
                            </OptionCircleButton>
                            <ButtonOptionText>{option.name}</ButtonOptionText>
                        </ButtonOptionContainer>
                    );
                })}
                <View style={{ alignItems: "center" }}>
                    <NormalSend
                        style={{ width: "50%" }}
                        onPress={() => handleFilterHeatMap()}
                    >
                        <SendLabel>Filtrar</SendLabel>
                    </NormalSend>
                </View>
            </FilterModal>
        </SafeAreaView>
    );
};

export default Home;

import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
    useFocusEffect,
    useRoute,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { Marker, MapEvent } from "react-native-maps";

import LoggedInModal from "../../components/LoggedInModal";
import StayAlert from "../../components/StayAlert";
import { getAllUsersOccurrences } from "../../services/occurrences";
import { getUser } from "../../services/users";
import { FilterButton, StayNormalMap } from "./styles";
import HeatMap from "../HeatMap";
import { scale } from "../../utils/scalling";
import { Feather } from "@expo/vector-icons";

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

const Home = () => {
    const route = useRoute<RouteProp<ParamList, "params">>();
    const navigation = useNavigation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    const [isHeatMap, setIsHeatMap] = useState(false);

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

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FilterButton
                style={{
                    elevation: 20,
                }}
                onPress={() => setIsHeatMap(!isHeatMap)}
            >
                <Feather name="filter" size={scale(30)} color="#C8C8C8" />
            </FilterButton>
            {!isLogged && <LoggedInModal navObject={navigation} />}
            {isHeatMap ? (
                <HeatMap />
            ) : (
                <StayNormalMap
                    loadingEnabled={true}
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
        </SafeAreaView>
    );
};

export default Home;

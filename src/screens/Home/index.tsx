import AsyncStorage from "@react-native-community/async-storage";
import {
    useFocusEffect,
    useRoute,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useCallback, useState } from "react";
import { Marker, MapEvent } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import LoggedInModal from "../../components/LoggedInModal";
import StayAlert from "../../components/StayAlert";
import { getAllUsersOccurrences } from "../../services/occurrences";
import { getUser } from "../../services/users";
import { StayNormalMap } from "./styles";

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
            {!isLogged && <LoggedInModal navObject={navigation} />}
            <StayNormalMap
                initialRegion={{
                    latitude: -15.9897883,
                    longitude: -48.0464073,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0031,
                }}
                style={{ flex: 1 }}
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
                            onPress={() =>
                                navigation.navigate("OccurrenceDetails", {
                                    occurrence,
                                })
                            }
                        />
                    );
                })}
            </StayNormalMap>
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

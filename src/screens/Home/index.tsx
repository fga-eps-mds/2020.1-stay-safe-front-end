import { Feather } from "@expo/vector-icons";
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
import { useTheme } from "styled-components";

import CircularLoader from "../../components/CircularLoader";
import LoggedInModal from "../../components/LoggedInModal";
import { NormalSend, SendLabel } from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import Logo from "../../img/logo-thief.svg";
import { getAllUsersOccurrences } from "../../services/occurrences";
import { getOccurrencesByCrimeNature } from "../../services/occurrencesSecretary";
import { scale } from "../../utils/scalling";
import HeatMap from "../HeatMap";
import { searchOptions } from "./searchOptions";
import {
    FilterButton,
    FilterModal,
    StayNormalMap,
    ButtonOptionContainer,
    ButtonOptionText,
    Option,
    OptionCircleButton,
    OptionColor,
    TabFilter,
    Tab,
    TabTitle,
    Span,
} from "./styles";
import { Occurrence } from "../../interfaces/occurrence";

type ParamList = {
    params: {
        showReportModal: boolean;
    };
};

interface SecretaryOccurrence {
    capture_data: string;
    cities: Array<CityCrimes>;
    period: string;
}

interface CityCrimes {
    name: string;
    crimes: Array<Crimes>;
}

interface Crimes {
    nature: string;
    quantity: number;
}

const Home: React.FC = () => {
    const theme = useTheme();
    const { data } = useUser();

    const route = useRoute<RouteProp<ParamList, "params">>();
    const navigation = useNavigation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState([0]);

    const [secretaryOccurrences, setSecretaryOccurrences] = useState([]);

    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("heat");

    const [isLoading, setIsLoading] = useState(false);

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

    const getPinColor = (occurrence) => {
        return searchOptions.filter(
            (op) => op.name === occurrence.occurrence_type
        )[0].color;
    };

    const handleSubmitFilter = () => {
        if (selectedFilter === "heat") {
            if (selectedOption.length > 1) return null;
            handleFilterHeatMap();
        } else if (selectedFilter === "pins") handleFilterPins();
    };

    const handleFilterPins = async () => {
        let occurrence_type = "";
        let end;
        if (selectedOption[0] !== 0) {
            for (let i = 0; i < selectedOption.length; i++) {
                end = i === selectedOption.length - 1 ? "" : ", ";
                occurrence_type = occurrence_type.concat(
                    searchOptions[selectedOption[i] - 1].name,
                    end
                );
            }
        }
        const response = await getAllUsersOccurrences(occurrence_type);
        if (response.status === 200) {
            setOccurrences(response.body);
            setIsFilterOpen(false);
        } else console.warn("Erro ao pegar todas as ocorrências");
    };

    const handleFilterHeatMap = () => {
        setIsLoading(true);

        async function loadData() {
            const option = searchOptions[selectedOption[0] - 1];

            const response = await getOccurrencesByCrimeNature(
                "df",
                option.label
            );

            if (response.status === 200) {
                const responseOfYear2019 = response.body.filter(
                    (year: SecretaryOccurrence) => year.period === "1/2019"
                )[0].cities;

                setSecretaryOccurrences(responseOfYear2019);
                return "Stay Safe";
            }
        }

        if (selectedOption[0] > 0) {
            loadData().then((res) => {
                setIsLoading(false);
                setIsFilterOpen(false);
            });
        } else {
            setIsWarningOpen(true);
        }
    };

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
        if (selectedOption.indexOf(id) >= 0) {
            let aux = selectedOption.filter((i) => i !== id);
            if (aux.length === 0) aux = [0];
            setSelectedOption(aux);
            return null;
        }
        const aux = selectedOption[0] === 0 ? [id] : [...selectedOption, id];
        setSelectedOption(aux);
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
                    <Feather
                        name="filter"
                        size={scale(30)}
                        color={theme.primaryGray}
                    />
                </FilterButton>
            )}
            {data.token === "" && !isFilterOpen && selectedOption[0] <= 0 && (
                <LoggedInModal navObject={navigation} />
            )}
            {selectedOption[0] > 0 &&
            !isFilterOpen &&
            selectedFilter === "heat" ? (
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
                    {occurrences !== undefined &&
                        occurrences?.map((occurrence: Occurrence) => {
                            return (
                                <Marker
                                    key={occurrence.id_occurrence}
                                    coordinate={{
                                        latitude: occurrence.location[0],
                                        longitude: occurrence.location[1],
                                    }}
                                    onPress={() =>
                                        navigation.navigate(
                                            "OccurrenceDetails",
                                            {
                                                occurrence,
                                            }
                                        )
                                    }
                                    tracksViewChanges={false}
                                >
                                    <Logo
                                        width={scale(38)}
                                        height={scale(38)}
                                        fill={getPinColor(occurrence)}
                                    />
                                </Marker>
                            );
                        })}
                </StayNormalMap>
            )}
            <StayAlert
                show={isModalOpen && data.token !== ""}
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
                        alignItems: "center",
                    }}
                >
                    <TabFilter>
                        <Tab
                            onPress={() => setSelectedFilter("heat")}
                            focus={selectedFilter === "heat"}
                        >
                            <TabTitle focus={selectedFilter === "heat"}>
                                Cidade
                            </TabTitle>
                        </Tab>
                        <Tab
                            onPress={() => setSelectedFilter("neighborhood")}
                            focus={selectedFilter === "neighborhood"}
                        >
                            <TabTitle focus={selectedFilter === "neighborhood"}>
                                Bairro
                            </TabTitle>
                        </Tab>
                        <Tab
                            onPress={() => setSelectedFilter("pins")}
                            focus={selectedFilter === "pins"}
                        >
                            <TabTitle focus={selectedFilter === "pins"}>
                                Local
                            </TabTitle>
                        </Tab>
                    </TabFilter>
                </View>
                {searchOptions.map((option) => {
                    return (
                        <ButtonOptionContainer key={option.id}>
                            <Option>
                                <OptionCircleButton
                                    onPress={() =>
                                        handleSelectOption(option.id)
                                    }
                                >
                                    <Feather
                                        name={
                                            selectedOption.indexOf(option.id) >=
                                            0
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={scale(20)}
                                        color={theme.primaryBlack}
                                    />
                                </OptionCircleButton>

                                <ButtonOptionText>
                                    {option.name}
                                </ButtonOptionText>
                            </Option>

                            {selectedFilter === "pins" && (
                                <OptionColor color={option.color} />
                            )}
                        </ButtonOptionContainer>
                    );
                })}
                <View>
                    <Span
                        show={
                            selectedFilter === "heat" &&
                            selectedOption.length > 1
                        }
                    >
                        Selecione apenas uma opção
                    </Span>
                </View>
                <View style={{ alignItems: "center" }}>
                    <NormalSend
                        style={[
                            { width: "50%" },
                            isLoading && { padding: scale(9) },
                        ]}
                        onPress={() => handleSubmitFilter()}
                    >
                        {isLoading ? (
                            <CircularLoader size={28} />
                        ) : (
                            <SendLabel>Filtrar</SendLabel>
                        )}
                    </NormalSend>
                    <Span show style={{ marginTop: scale(5) }}>
                        ou clique no mapa para voltar
                    </Span>
                </View>
            </FilterModal>
        </SafeAreaView>
    );
};

export default Home;

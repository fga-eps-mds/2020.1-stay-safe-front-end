import { Feather } from "@expo/vector-icons";
import {
    useFocusEffect,
    useRoute,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import * as Font from "expo-font";
import * as Location from "expo-location";
import React, { useCallback, useState, useEffect } from "react";
import { View } from "react-native";
import { Marker, MapEvent } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeatMap from "../../components/HeatMap";
import {
    InfoModal,
    InfoTitle,
    InfoContainer,
    Info,
    InfoColor,
    InfoText,
    InfoSubText,
} from "../../components/InfoModal";
import Loader from "../../components/Loader";
import LoggedInModal from "../../components/LoggedInModal";
import { NormalSend, SendLabel } from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import { useUser } from "../../hooks/user";
import DarkLogo from "../../img/logo-thief-dark.svg";
import Logo from "../../img/logo-thief.svg";
import { Occurrence } from "../../interfaces/occurrence";
import { getAllUsersOccurrences } from "../../services/occurrences";
import { getOccurrencesByCrimeNature } from "../../services/occurrencesSecretary";
import staySafeDarkMapStyle from "../../styles/staySafeDarkMapStyle";
import { scale } from "../../utils/scalling";
import { searchOptionsDf, searchOptionsSp, ufs } from "./searchOptions";
import {
    FilterButton,
    FilterModal,
    HeatInfo,
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
    UfDropDown,
    DropDownContainer,
    DropDownTitle,
} from "./styles";
import { tabs } from "./tabs";

type ParamList = {
    params: {
        showReportModal: boolean;
        showFavoritePlaceModal: boolean;
    };
};

interface CrimeOption {
    id: number;
    name: string;
    label: string;
    color: string;
    range: number[];
}

const initialLocation = {
    latitude: -15.780311,
    longitude: -47.768043,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
};

const Home: React.FC = () => {
    const theme = useTheme();
    const { data } = useUser();

    const route = useRoute<RouteProp<ParamList, "params">>();
    const navigation = useNavigation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
    const [isSelectingPlace, setIsSelectingPlace] = useState(false);
    const [location, setLocation] = useState(initialLocation);
    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState([0]);

    const [searchOptions, setSearchOptions] = useState(searchOptionsDf);
    const [crimeOption, setCrimeOption] = useState<CrimeOption>();

    const [isInfoHeatOpen, setIsInfoHeatOpen] = useState(false);

    const [secretaryOccurrences, setSecretaryOccurrences] = useState([]);

    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("heat");

    const [selectedUf, setSelectedUf] = useState("df");

    const [isLoading, setIsLoading] = useState(false);

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    useFocusEffect(
        useCallback(() => {
            setIsReporting(false);
            setIsSelectingPlace(false);
        }, [])
    );

    useFocusEffect(() => {
        if (route.params) {
            setIsModalOpen(route.params.showReportModal);
            setIsPlaceModalOpen(route.params.showFavoritePlaceModal);
        }
    });

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
            console.warn("Permission to access location was denied");
        }

        const position = await Location.getCurrentPositionAsync({});

        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        };

        setLocation(location);
    };

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
                selectedUf,
                option.label,
                "1/2020",
                "12/2020",
                1
            );

            if (response.status === 200) {
                const responseOfCurrentYear = response.body[0].cities;

                setSecretaryOccurrences(responseOfCurrentYear);
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
        setIsPlaceModalOpen(false);

        navigation.setParams({
            showReportModal: null,
            showFavoritePlaceModal: null,
        });
    };

    const handleReportingCoordinatesOnMap = (e: MapEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;

        if (isReporting) {
            setIsReporting(false);
            navigation.navigate("Occurrence", { latitude, longitude });
        } else if (isSelectingPlace) {
            setIsSelectingPlace(false);
            navigation.navigate("FavoritePlaces", { latitude, longitude });
        }
    };

    const handleSelectOption = (id: number) => {
        if (selectedOption.indexOf(id) >= 0) {
            let aux = selectedOption.filter((i) => i !== id);
            if (aux.length === 0) aux = [0];
            setSelectedOption(aux);
            setCrimeOption(searchOptions[aux[0] - 1]);
            return null;
        }
        const aux = selectedOption[0] === 0 ? [id] : [...selectedOption, id];
        setSelectedOption(aux);
        setCrimeOption(searchOptions[aux[0] - 1]);
    };

    if (!loaded) return null;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!isFilterOpen && (
                <FilterButton onPress={() => setIsFilterOpen(true)}>
                    <Feather
                        name="filter"
                        size={scale(30)}
                        color={theme.primaryGray}
                    />
                </FilterButton>
            )}
            {selectedFilter === "heat" &&
                !isInfoHeatOpen &&
                selectedOption[0] !== 0 && (
                    <HeatInfo onPress={() => setIsInfoHeatOpen(true)}>
                        <Feather
                            name="info"
                            size={scale(30)}
                            color={theme.primaryGray}
                        />
                    </HeatInfo>
                )}
            {data.token === "" && !isFilterOpen && selectedOption[0] <= 0 && (
                <LoggedInModal navObject={navigation} />
            )}
            {selectedOption[0] > 0 &&
            !isFilterOpen &&
            selectedFilter === "heat" ? (
                <HeatMap
                    secretaryOccurrences={secretaryOccurrences}
                    city={selectedUf}
                />
            ) : (
                <StayNormalMap
                    region={location}
                    onPress={(e) => handleReportingCoordinatesOnMap(e)}
                    showsUserLocation
                    loadingEnabled
                    customMapStyle={
                        theme.type === "dark" ? staySafeDarkMapStyle : []
                    }
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
                                    {theme.type === "dark" ? (
                                        <DarkLogo
                                            width={scale(38)}
                                            height={scale(38)}
                                            fill={getPinColor(occurrence)}
                                        />
                                    ) : (
                                        <Logo
                                            width={scale(38)}
                                            height={scale(38)}
                                            fill={getPinColor(occurrence)}
                                        />
                                    )}
                                </Marker>
                            );
                        })}
                </StayNormalMap>
            )}
            <StayAlert
                show={(isPlaceModalOpen || isModalOpen) && data.token !== ""}
                title={
                    isPlaceModalOpen
                        ? "Selecionar Local Favorito"
                        : "Reportar Ocorrência"
                }
                message="Toque para selecionar o local no mapa com o marcador"
                showConfirmButton
                confirmText="Entendido"
                onConfirmPressed={() => {
                    handleClosedModal();
                    if (isPlaceModalOpen) setIsSelectingPlace(true);
                    else setIsReporting(true);
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
                isOpen={isFilterOpen}
                onClosed={() => setIsFilterOpen(false)}
                swipeToClose={false}
                position="top"
                backdropOpacity={0}
                backButtonClose
                ufOptionOpen={selectedFilter === "heat"}
            >
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <TabFilter>
                        {tabs.map((item, index) => {
                            return (
                                <Tab
                                    key={`tab-${index}`}
                                    onPress={() => setSelectedFilter(item.name)}
                                    focus={selectedFilter === item.name}
                                >
                                    <TabTitle
                                        focus={selectedFilter === item.name}
                                    >
                                        {item.text}
                                    </TabTitle>
                                </Tab>
                            );
                        })}
                    </TabFilter>
                    {selectedFilter === "heat" && (
                        <DropDownContainer>
                            <DropDownTitle>Selecione uma UF :</DropDownTitle>
                            <UfDropDown
                                style={{
                                    backgroundColor: theme.primaryLightGray,
                                }}
                                items={ufs}
                                defaultValue={selectedUf}
                                onChangeItem={(item) => {
                                    setSelectedUf(item.value);
                                    if (item.value === "df") {
                                        setSearchOptions(searchOptionsDf);
                                    } else {
                                        setSearchOptions(searchOptionsSp);
                                    }
                                }}
                            />
                        </DropDownContainer>
                    )}
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
                        style={{ width: "50%" }}
                        onPress={() => handleSubmitFilter()}
                    >
                        <SendLabel>Filtrar</SendLabel>
                    </NormalSend>
                    <Span show style={{ marginTop: scale(5) }}>
                        ou clique no mapa para voltar
                    </Span>
                </View>
            </FilterModal>

            {selectedOption[0] !== 0 && (
                <InfoModal
                    isOpen={isInfoHeatOpen}
                    onClosed={() => setIsInfoHeatOpen(false)}
                    swipeToClose={false}
                    position="center"
                    backdropOpacity={0}
                    backButtonClose
                >
                    <View style={{ alignItems: "center" }}>
                        <InfoTitle>Legenda: {crimeOption?.name}</InfoTitle>
                        <InfoContainer>
                            <Info>
                                <InfoColor color={theme.heatMapGreen1} />
                                <InfoText>
                                    {crimeOption?.range[0] === 0
                                        ? `${crimeOption.range[0]}*`
                                        : `< ${crimeOption?.range[0]}*`}
                                </InfoText>
                            </Info>
                            <Info>
                                <InfoColor color={theme.heatMapYellow2} />
                                <InfoText>
                                    {`${crimeOption?.range[0]} - ${crimeOption?.range[1]}*`}
                                </InfoText>
                            </Info>
                            <Info>
                                <InfoColor color={theme.heatMapOrange3} />
                                <InfoText>
                                    {`${crimeOption?.range[1]} - ${crimeOption?.range[2]}*`}
                                </InfoText>
                            </Info>
                            <Info>
                                <InfoColor color={theme.heatMapOrange4} />
                                <InfoText>
                                    {`${crimeOption?.range[2]} - ${crimeOption?.range[3]}*`}
                                </InfoText>
                            </Info>
                            <Info>
                                <InfoColor color={theme.heatMapOrange5} />
                                <InfoText>
                                    {`${crimeOption?.range[3]} - ${crimeOption?.range[4]}*`}
                                </InfoText>
                            </Info>
                            <Info>
                                <InfoColor color={theme.heatMapRed6} />
                                <InfoText>
                                    {`> ${crimeOption?.range[4]}*`}
                                </InfoText>
                            </Info>
                        </InfoContainer>
                        <InfoSubText style={{ marginBottom: 10 }}>
                            * Casos anuais por 100.000 habitantes
                        </InfoSubText>
                        <InfoSubText>
                            {`* Dados adquiridos da Secretaria de Segurança Pública - ${selectedUf.toUpperCase()}`}
                        </InfoSubText>
                    </View>
                </InfoModal>
            )}
            {isLoading && <Loader />}
        </SafeAreaView>
    );
};

export default Home;

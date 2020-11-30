import { Feather } from "@expo/vector-icons";
import {
    useFocusEffect,
    useRoute,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useCallback, useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { MapEvent } from "react-native-maps";
import { FAB, Portal, Provider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";;
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
import { ButtonWithIconLabel } from "../../components/NormalForms";
import StayAlert from "../../components/StayAlert";
import StayMarker from "../../components/StayMarker";
import StayNormalMap from "../../components/StayNormalMap";
import { useUser } from "../../hooks/user";
import { Occurrence } from "../../interfaces/occurrence";
import { getAllUsersOccurrences } from "../../services/occurrences";
import { getOccurrencesByCrimeNature } from "../../services/occurrencesSecretary";
import staySafeDarkMapStyle from "../../styles/staySafeDarkMapStyle";
import { scale } from "../../utils/scalling";
import { searchOptionsDf, searchOptionsSp, ufs } from "./searchOptions";
import {
    FilterModal,
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
    DropDownTitle
} from "./styles";

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

const Home: React.FC = () => {
    const theme = useTheme();
    const { data, location, centralize } = useUser();

    const route = useRoute<RouteProp<ParamList, "params">>();
    const navigation = useNavigation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
    const [isSelectingPlace, setIsSelectingPlace] = useState(false);
    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState([0]);

    const [searchOptions, setSearchOptions] = useState(searchOptionsDf);
    const [crimeOption, setCrimeOption] = useState<CrimeOption>();

    const [isInfoHeatOpen, setIsInfoHeatOpen] = useState(false);

    const [secretaryOccurrences, setSecretaryOccurrences] = useState([]);

    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("pins");

    const [selectedUf, setSelectedUf] = useState("df");

    const [isLoading, setIsLoading] = useState(false);

    const [showIcons, setShowIcons] = useState(false)

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../../fonts/TruenoRg.otf"),
    });

    const [icons, setIcons] = useState([
        {
            icon: "map",
            label: "Secretarias",
            onPress: () => {
                setSelectedUf("df");
                setIsFilterOpen(true);
                setSelectedFilter("heat");
                setSelectedOption([0]);
            }
        },
        {
            icon: "filter",
            label: "Filtros",
            onPress: () => setIsFilterOpen(true)
        }
    ])

    const loadIcons = () => {
        let aux_icons = icons
        aux_icons[0] = {
            icon: selectedFilter === "heat" ? "map-marker" : "map",
            label: selectedFilter === "heat" ? "Usuários" : "Secretarias",
            onPress: () => {
                if (selectedFilter === "heat") {
                    setSelectedFilter("pins");
                    setSelectedOption([0]);
                } else {
                    setSelectedUf("df");
                    setIsFilterOpen(true);
                    setSelectedFilter("heat");
                    setSelectedOption([0]);
                }
            }
        }
        if (selectedFilter === "heat") {
            aux_icons.push({
                icon: "information-outline",
                label: "Informações",
                onPress: () => setIsInfoHeatOpen(true),
            })
        } else if (icons.length > 2) {
            aux_icons.pop()
        }
        setIcons(aux_icons)
    }

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

    useEffect(() => {
        loadIcons();
    }, [selectedFilter]);

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

    const getInfoText = (crimeRange: number[], index: number) => {
        if (index === 0) {
            if (crimeRange[0] === 0) return `${crimeRange[index]}*`;
            else return `< ${crimeRange[index]}*`;
        } else if (index === 5) {
            return `> ${crimeRange[index - 1]}*`;
        } else {
            return `${crimeRange[index - 1]} - ${crimeRange[index]}*`;
        }
    };

    const getInfoColor = (index: number) => {
        let infoColor = "";
        if (index === 0) infoColor = theme.heatMapGreen1;
        if (index === 1) infoColor = theme.heatMapYellow2;
        if (index === 2) infoColor = theme.heatMapOrange3;
        if (index === 3) infoColor = theme.heatMapOrange4;
        if (index === 4) infoColor = theme.heatMapOrange5;
        if (index === 5) infoColor = theme.heatMapRed6;

        return infoColor;
    };

    if (!loaded) return null;

    return (
        <Provider>
            <Portal>
                <SafeAreaView style={{ flex: 1 }}>
                    {!isFilterOpen && (
                        <FAB.Group
                            style={{
                                zIndex: 1000,
                                paddingRight: 0,
                                paddingBottom: 100 / 2 + 10 - 16,
                            }}
                            theme={{
                                dark: true,
                                colors: {
                                    surface: theme.primarySuperDarkBlue,
                                    text: theme.primaryLightBlue
                                },
                            }}
                            open={showIcons}
                            fabStyle={{
                                backgroundColor: theme.primaryWhite,
                                borderColor: theme.primaryLightBlue,
                                borderWidth: scale(1),
                            }}
                            color={theme.primaryRed}
                            icon={showIcons ? "dots-vertical" : "dots-horizontal"}
                            actions={icons}
                            onStateChange={() => setShowIcons(!showIcons)}
                            visible
                        />
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
                            region={centralize ? location : undefined}
                            onPress={(e) => handleReportingCoordinatesOnMap(e)}
                            showsUserLocation
                            loadingEnabled
                            customMapStyle={
                                theme.type === "dark" ? staySafeDarkMapStyle : []
                            }
                        >
                            {occurrences !== undefined &&
                                !isReporting &&
                                occurrences.map((occurrence: Occurrence) => {
                                    return (
                                        <StayMarker
                                            key={occurrence.id_occurrence}
                                            occurrence={occurrence}
                                        />
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
                                <Tab>
                                    <TabTitle>
                                        {selectedFilter === "heat"
                                            ? "Calor"
                                            : "Ocorrências"}
                                    </TabTitle>
                                </Tab>
                            </TabFilter>
                            {selectedFilter === "heat" && (
                                <DropDownContainer>
                                    <DropDownTitle>Selecione uma UF:</DropDownTitle>
                                    <UfDropDown
                                        style={{
                                            backgroundColor: theme.primaryLightGray,
                                        }}
                                        items={ufs}
                                        defaultValue={selectedUf}
                                        onChangeItem={(item) => {
                                            setSelectedUf(item.value);
                                            setSelectedOption([0]);

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
                                <ButtonOptionContainer
                                    key={option.id}
                                    onPress={() => handleSelectOption(option.id)}
                                >
                                    <Option>
                                        <OptionCircleButton>
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
                            <Button
                                onPress={() => handleSubmitFilter()}
                                color={theme.primaryRed}
                                enabled={
                                    !(
                                        selectedFilter === "heat" &&
                                        (selectedOption[0] === 0 ||
                                            selectedOption.length !== 1)
                                    )
                                }
                            >
                                <Feather
                                    name="filter"
                                    size={scale(18)}
                                    color={theme.primaryWhite}
                                />
                                <ButtonWithIconLabel>Filtrar</ButtonWithIconLabel>
                            </Button>
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
                                    {[...Array(6)].map((_, index) => {
                                        return (
                                            <Info key={index}>
                                                <InfoColor
                                                    color={getInfoColor(index)}
                                                />
                                                <InfoText>
                                                    {crimeOption !== undefined
                                                        ? getInfoText(
                                                            crimeOption.range,
                                                            index
                                                        )
                                                        : ""}
                                                </InfoText>
                                            </Info>
                                        );
                                    })}
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
            </Portal>
        </Provider>
    );
};

export default Home;

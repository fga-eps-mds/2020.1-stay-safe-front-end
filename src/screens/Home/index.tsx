import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Font from "expo-font";
import moment from "moment";
import React, { useCallback, useState, useEffect } from "react";
import { View } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Button from "../../components/Button";
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
    DropDownTitle,
} from "./styles";

interface CrimeOption {
    id: number;
    name: string;
    label: string;
    color: string;
    range: number[];
}

const Home: React.FC = () => {
    const theme = useTheme();
    const { location, centralize, updateCentralize, data } = useUser();

    const [initialMonth, setInitialMonth] = useState("");
    const [finalMonth, setFinalMonth] = useState("");

    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState([0]);

    const [searchOptions, setSearchOptions] = useState(searchOptionsDf);
    const [crimeOption, setCrimeOption] = useState<CrimeOption>();

    const [isInfoHeatOpen, setIsInfoHeatOpen] = useState(false);

    const [secretaryOccurrences, setSecretaryOccurrences] = useState([]);

    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("pins");
    const [selectedPins, setSelectedPins] = useState("pins");

    const [selectedUf, setSelectedUf] = useState("df");

    const [isLoading, setIsLoading] = useState(false);

    const [showIcons, setShowIcons] = useState(false);

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
            },
        },
        {
            icon: "filter",
            label: "Filtros",
            onPress: () => {
                setIsFilterOpen(true);
                setSelectedPins("pins");
            },
        },
    ]);

    const addFavoritePlaceOption = () => {
        if (data.token !== "") {
            setIcons([
                ...icons,
                {
                    icon: "star",
                    label: "Locais favoritos",
                    onPress: () => setSelectedPins("favorite"),
                },
            ]);
        } else {
            setIcons(icons.filter((icon) => icon.label !== "Locais favoritos"));
        }
    };

    useEffect(() => {
        addFavoritePlaceOption();
    }, [data]);

    const loadIcons = () => {
        const number = data.token !== "" ? 4 : 3;
        const aux_icons = icons;
        aux_icons[0] = {
            icon: selectedFilter === "heat" ? "map-marker" : "map",
            label: selectedFilter === "heat" ? "Usuários" : "Secretarias",
            onPress: () => {
                if (selectedFilter === "heat") {
                    setSelectedFilter("pins");
                    setSelectedOption([0]);
                    updateCentralize(true);
                } else if (selectedFilter === "pins") {
                    setSelectedUf("df");
                    setIsFilterOpen(true);
                    setSelectedFilter("heat");
                    setSelectedOption([0]);
                }
            },
        };
        if (selectedFilter === "heat" && icons.length < number) {
            aux_icons.push({
                icon: "information-outline",
                label: "Informações",
                onPress: () => setIsInfoHeatOpen(true),
            });
        } else if (selectedFilter === "pins" && icons.length > number - 1) {
            aux_icons.pop();
        }
        setIcons(aux_icons);
    };

    useEffect(() => {
        getInitialAndFinalMonth();
        addFavoritePlaceOption();
    }, []);

    useEffect(() => {
        loadIcons();
    }, [selectedFilter]);

    const getInitialAndFinalMonth = () => {
        const date = moment().subtract(2, "M");

        const year = date.year();
        const month = date.month() + 1;

        setFinalMonth(month + "/" + year);
        setInitialMonth(month + "/" + (year - 1));
    };

    const handleSubmitFilter = () => {
        loadIcons();
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
                initialMonth,
                finalMonth,
                1
            );

            if (response.status === 200) {
                const responseOfCurrentYear = response.body[0].cities;

                setSecretaryOccurrences(responseOfCurrentYear);
                return "Stay Safe";
            }
        }

        try {
            if (selectedOption[0] > 0) {
                loadData().then((res) => {
                    setIsFilterOpen(false);
                });
            } else {
                setIsWarningOpen(true);
            }
        } catch (e) {
            console.warn(e);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getAllUsersOccurrences().then((response) => {
                setOccurrences(response.body);
            });
        }, [])
    );

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
                                    text: theme.primaryLightBlue,
                                },
                            }}
                            open={showIcons}
                            fabStyle={{
                                backgroundColor: theme.primaryWhite,
                                borderColor: theme.primaryLightBlue,
                                borderWidth: scale(1),
                            }}
                            color={theme.primaryRed}
                            icon={
                                showIcons ? "dots-vertical" : "dots-horizontal"
                            }
                            actions={icons}
                            onStateChange={() => setShowIcons(!showIcons)}
                            visible
                            onPress={() => {
                                updateCentralize(false);
                            }}
                        />
                    )}
                    {selectedFilter === "heat" ? (
                        <HeatMap
                            secretaryOccurrences={secretaryOccurrences}
                            city={selectedUf}
                        />
                    ) : (
                        <StayNormalMap
                            region={centralize ? location : undefined}
                            showsUserLocation
                            loadingEnabled
                            customMapStyle={
                                theme.type === "dark"
                                    ? staySafeDarkMapStyle
                                    : []
                            }
                        >
                            {selectedPins === "pins"
                                ? occurrences !== undefined &&
                                  occurrences.map((occurrence: Occurrence) => {
                                      return (
                                          <StayMarker
                                              key={occurrence.id_occurrence}
                                              occurrence={occurrence}
                                          />
                                      );
                                  })
                                : null}
                            {/* {occurrences !== undefined &&
                                occurrences.map((occurrence: Occurrence) => {
                                    return (
                                        <StayMarker
                                            key={occurrence.id_occurrence}
                                            occurrence={occurrence}
                                        />
                                    );
                                })} */}
                        </StayNormalMap>
                    )}
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
                        onClosed={() => {
                            setIsFilterOpen(false);
                        }}
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
                                    <DropDownTitle>
                                        Selecione uma UF:
                                    </DropDownTitle>
                                    <UfDropDown
                                        style={{
                                            backgroundColor:
                                                theme.primaryLightGray,
                                        }}
                                        items={ufs}
                                        defaultValue={selectedUf}
                                        onChangeItem={(item) => {
                                            setSelectedUf(item.value);
                                            setSelectedOption([0]);

                                            if (item.value === "df") {
                                                setSearchOptions(
                                                    searchOptionsDf
                                                );
                                            } else {
                                                setSearchOptions(
                                                    searchOptionsSp
                                                );
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
                                    onPress={() =>
                                        handleSelectOption(option.id)
                                    }
                                >
                                    <Option>
                                        <OptionCircleButton>
                                            <Feather
                                                name={
                                                    selectedOption.indexOf(
                                                        option.id
                                                    ) >= 0
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
                                <ButtonWithIconLabel>
                                    Filtrar
                                </ButtonWithIconLabel>
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
                                <InfoTitle>
                                    Legenda: {crimeOption?.name}
                                </InfoTitle>
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
                                    {`* Dados adquiridos da Secretaria de Segurança Pública - ${selectedUf.toUpperCase()} correspondentes ao período de ${initialMonth} até ${finalMonth} `}
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

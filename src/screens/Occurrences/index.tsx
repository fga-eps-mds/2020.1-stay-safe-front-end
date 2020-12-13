import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import staySafeDarkMapStyle from "../..//styles/staySafeDarkMapStyle";
import {
    ScrollViewStyled,
    CardContainer,
    Card,
    CardData,
    Title,
    Date,
    CardActions,
} from "../../components/Cards";
import HeaderTitle from "../../components/HeaderTitle";
import Loader from "../../components/Loader";
import StayAlert from "../../components/StayAlert";
import StayMarker from "../../components/StayMarker";
import StayNormalMap from "../../components/StayNormalMap";
import { useUser } from "../../hooks/user";
import { Occurrence } from "../../interfaces/occurrence";
import {
    getUserOccurrences,
    deleteOccurrence,
} from "../../services/occurrences";
import { scale } from "../../utils/scalling";
import { TextStyled } from "../FavoritePlaces/styles";

const Occurrences: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const { data } = useUser();

    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [idOccurrence, setIdOccurrence] = useState(0);

    const [activeOccurrences, setActiveOccurrences] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let unsubscribe;

        setIsLoading(true);

        try {
            unsubscribe = navigation.addListener("focus", () => {
                fetchData().then((res) => {});
            });
        } catch (e) {
            console.warn(e);
        } finally {
            setIsLoading(false);
        }

        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        if (data.username !== "") {
            const response = await getUserOccurrences(data.username);
            if (!response.body.errors && response.status === 200)
                setOccurrences(response.body);
            else console.warn("Falha ao carregar as ocorrências do usuário.");
        }
    };

    const handleDelete = async (id: number) => {
        if (data.token !== "") {
            const response = await deleteOccurrence(id, data.token);
            if (response.status === 204) {
                setOccurrences(
                    occurrences.filter(
                        (occurrence) => occurrence.id_occurrence !== id
                    )
                );
            }
        }
        setConfirmModal(false);
    };

    const _renderHeader = (
        occurrence: Occurrence,
        index: number,
        isActive: boolean
    ) => {
        return (
            <Card
                style={{
                    width: "100%",
                    alignSelf: "center",
                    marginBottom: 0,
                    borderBottomLeftRadius: isActive ? 0 : scale(16),
                    borderBottomRightRadius: isActive ? 0 : scale(16),
                    borderBottomColor: isActive
                        ? theme.primaryGray
                        : theme.primaryBackground,
                    borderBottomWidth: isActive ? 1 : 0,
                }}
            >
                <CardData>
                    <Title>{occurrence.occurrence_type}</Title>
                    <Date>{occurrence.occurrence_date_time}</Date>
                </CardData>

                <CardActions>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Occurrence", {
                                occurrence,
                            });
                        }}
                    >
                        <Feather
                            name="edit-3"
                            size={scale(22)}
                            color={theme.primarySuperDarkBlue}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setConfirmModal(true);
                            setIdOccurrence(occurrence.id_occurrence);
                        }}
                    >
                        <Feather
                            name="trash-2"
                            size={scale(22)}
                            color={theme.primarySuperDarkBlue}
                        />
                    </TouchableOpacity>
                </CardActions>
            </Card>
        );
    };

    const _renderContent = (
        occurrence: Occurrence,
        index: number,
        isActive: boolean
    ) => {
        return (
            <Card
                style={{
                    width: "100%",
                    alignSelf: "center",
                    marginBottom: 0,
                    borderTopLeftRadius: isActive ? 0 : scale(16),
                    borderTopRightRadius: isActive ? 0 : scale(16),
                    borderBottomLeftRadius: scale(20),
                    borderBottomRightRadius: scale(20),
                }}
            >
                <StayNormalMap
                    style={{ padding: scale(100) }}
                    region={{
                        latitude: occurrence.location[0],
                        longitude: occurrence.location[1],
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    zoomEnabled={false}
                    scrollEnabled={false}
                    loadingEnabled
                    customMapStyle={
                        theme.type === "dark" ? staySafeDarkMapStyle : []
                    }
                >
                    <StayMarker occurrence={occurrence} />
                </StayNormalMap>
            </Card>
        );
    };

    const updateSections = (activeSections) => {
        setActiveOccurrences(
            activeSections.includes(undefined) ? [] : activeSections
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text="Minhas Ocorrências" goBack />
            <ScrollViewStyled>
                <CardContainer style={{ justifyContent: "center" }}>
                    {occurrences.length === 0 ? (
                        <Card style={isLoading && { justifyContent: "center" }}>
                            <CardData>
                                <Title
                                    style={{
                                        textAlign: "center",
                                        marginBottom: 0,
                                    }}
                                >
                                    Usuário não possui ocorrências
                                </Title>
                            </CardData>
                        </Card>
                    ) : (
                        <Accordion
                            containerStyle={{
                                width: "80%",
                                backgroundColor: theme.primaryBackground,
                            }}
                            sectionContainerStyle={{
                                elevation: 5,
                                marginBottom: scale(20),
                                backgroundColor: theme.primaryBackground,
                                borderTopLeftRadius: scale(20),
                                borderTopRightRadius: scale(20),
                                borderBottomLeftRadius: scale(20),
                                borderBottomRightRadius: scale(20),
                            }}
                            sections={occurrences}
                            activeSections={activeOccurrences}
                            touchableComponent={TouchableOpacity}
                            renderHeader={_renderHeader}
                            renderContent={_renderContent}
                            onChange={updateSections}
                            expandMultiple
                        />
                    )}
                    {occurrences.length !== 0 && (
                        <TextStyled>
                            Clique no card para ver onde foi registrado a
                            ocorrência
                        </TextStyled>
                    )}
                </CardContainer>
                <StayAlert
                    show={showConfirmModal}
                    title="Apagar Ocorrência"
                    message="Tem certeza que deseja apagar essa ocorrência? A ação não pode ser desfeita."
                    showConfirmButton
                    confirmText="Apagar"
                    onConfirmPressed={() => handleDelete(idOccurrence)}
                    showCancelButton
                    cancelText="Cancelar"
                    onCancelPressed={() => setConfirmModal(false)}
                    onDismiss={() => setConfirmModal(false)}
                />
                {isLoading && <Loader />}
            </ScrollViewStyled>
        </SafeAreaView>
    );
};

export default Occurrences;

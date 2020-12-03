import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

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
import { useUser } from "../../hooks/user";
import { Occurrence } from "../../interfaces/occurrence";
import {
    getUserOccurrences,
    deleteOccurrence,
} from "../../services/occurrences";
import { scale } from "../../utils/scalling";

const Occurrences: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const { data } = useUser();

    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [idOccurrence, setIdOccurrence] = useState(0);

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text="Minhas Ocorrências" goBack />
            <ScrollViewStyled>
                <CardContainer>
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
                        occurrences.map((occurrence) => {
                            return (
                                <Card key={occurrence.id_occurrence}>
                                    <CardData>
                                        <Title>
                                            {occurrence.occurrence_type}
                                        </Title>
                                        <Date>
                                            {occurrence.occurrence_date_time}
                                        </Date>
                                    </CardData>

                                    <CardActions>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(
                                                    "Occurrence",
                                                    {
                                                        occurrence,
                                                    }
                                                );
                                            }}
                                        >
                                            <Feather
                                                name="edit-3"
                                                size={scale(22)}
                                                color={
                                                    theme.primarySuperDarkBlue
                                                }
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setConfirmModal(true);
                                                setIdOccurrence(
                                                    occurrence.id_occurrence
                                                );
                                            }}
                                        >
                                            <Feather
                                                name="trash-2"
                                                size={scale(22)}
                                                color={
                                                    theme.primarySuperDarkBlue
                                                }
                                            />
                                        </TouchableOpacity>
                                    </CardActions>
                                </Card>
                            );
                        })
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

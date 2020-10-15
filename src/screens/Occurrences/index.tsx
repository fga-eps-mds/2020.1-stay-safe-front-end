import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import HeaderTitle from "../../components/HeaderTitle";
import StayAlert from "../../components/StayAlert";
import {
    getUserOccurrences,
    deleteOccurrence,
} from "../../services/occurrences";
import { scale } from "../../utils/scalling";
import {
    ScrollViewStyled,
    CardContainer,
    Card,
    CardData,
    Title,
    Date,
    CardActions,
} from "./styles";

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

const Occurrences: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();

    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [idOccurrence, setIdOccurrence] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        const username = await AsyncStorage.getItem("username");
        if (username != null) {
            const response = await getUserOccurrences(username);
            if (!response.body.errors && response.status === 200)
                setOccurrences(response.body);
            else console.warn("Falha ao carregar as ocorrências do usuário.");
        }
    };

    const handleDelete = async (id: number) => {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken != null) {
            const response = await deleteOccurrence(id, userToken);
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
                    {occurrences.map((occurrence) => {
                        return (
                            <Card key={occurrence.id_occurrence}>
                                <CardData>
                                    <Title>{occurrence.occurrence_type}</Title>
                                    <Date>
                                        {occurrence.occurrence_date_time}
                                    </Date>
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
                                            setIdOccurrence(
                                                occurrence.id_occurrence
                                            );
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
                    })}
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
            </ScrollViewStyled>
        </SafeAreaView>
    );
};

export default Occurrences;

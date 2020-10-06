import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const Occurrences = ({ navigation }) => {
    const [occurrences, setOccurrences] = useState([]);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [idOccurrence, setIdOccurrence] = useState(0);

    useEffect(() => {
        setConfirmModal(false);

        const unsubscribe = navigation.addListener("focus", () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        const username = await AsyncStorage.getItem("username");
        const response = await getUserOccurrences(username);
        if (!response.body.errors && response.status === 200)
            setOccurrences(response.body);
        else console.warn("Falha ao carregar as ocorrências do usuário.");
    };

    const handleDelete = async (id) => {
        const userToken = await AsyncStorage.getItem("userToken");
        setConfirmModal(false);
        const response = await deleteOccurrence(id, userToken);
        if (response.errors && response.status === 204)
            setOccurrences(
                occurrences.filter(
                    (occurrence) => occurrence.id_occurrence !== id
                )
            );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderTitle text="Minhas Ocorrências" />
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
                                            size={scale(24)}
                                            color="#010A26"
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
                                            size={scale(24)}
                                            color="#010A26"
                                        />
                                    </TouchableOpacity>
                                </CardActions>
                            </Card>
                        );
                    })}
                </CardContainer>
            </ScrollViewStyled>

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
            />
        </SafeAreaView>
    );
};

export default Occurrences;
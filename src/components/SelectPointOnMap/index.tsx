import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal } from "react-native";
import { MapEvent } from "react-native-maps";
import { useTheme } from "styled-components";

import { useUser } from "../../hooks/user";
import staySafeDarkMapStyle from "../../styles/staySafeDarkMapStyle";
import StayNormalMap from "../StayNormalMap";
import {
    MapContainer,
    ModalBack,
    ModalText,
    ModalWrapper,
    TitleContainer,
    XContainer,
} from "./styles";

interface SelectPointOnMapProps {
    onClose(): void;
    onPress: ([number, number]) => void;
}

const SelectPointOnMap: React.FC<SelectPointOnMapProps> = ({
    onClose,
    onPress,
}) => {
    const theme = useTheme();
    const { location } = useUser();

    const setPosition = (e: MapEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;

        onPress([latitude, longitude]);
        onClose();
    };

    return (
        <Modal transparent animationType="slide" onRequestClose={onClose}>
            <ModalBack>
                <ModalWrapper>
                    <TitleContainer>
                        <ModalText>
                            Selecione o local favorito no mapa
                        </ModalText>
                        <XContainer onPress={onClose}>
                            <Feather
                                name="x-circle"
                                color={theme.primaryDarkBlue}
                                size={22}
                            />
                        </XContainer>
                    </TitleContainer>
                    <MapContainer>
                        <StayNormalMap
                            region={location}
                            showsUserLocation
                            loadingEnabled
                            customMapStyle={
                                theme.type === "dark"
                                    ? staySafeDarkMapStyle
                                    : []
                            }
                            onPress={(e) => setPosition(e)}
                        />
                    </MapContainer>
                </ModalWrapper>
            </ModalBack>
        </Modal>
    );
};

export default SelectPointOnMap;

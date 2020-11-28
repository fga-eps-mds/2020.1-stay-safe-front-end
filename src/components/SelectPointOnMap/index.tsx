import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal } from "react-native";
import { Marker } from "react-native-maps";
import { useTheme } from "styled-components";

import { useUser } from "../../hooks/user";
import staySafeDarkMapStyle from "../../styles/staySafeDarkMapStyle";
import { scale } from "../../utils/scalling";
import { ButtonWithIconLabel } from "../NormalForms";
import StayNormalMap from "../StayNormalMap";
import {
    DoneButton,
    DoneButtonContainer,
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
    selectFavoritePlace: boolean;
}

interface Location {
    latitude: number;
    longitude: number;
}

const SelectPointOnMap: React.FC<SelectPointOnMapProps> = ({
    onClose,
    onPress,
    selectFavoritePlace,
}) => {
    const theme = useTheme();
    const { location, updateLocation } = useUser();

    const [chooseLocation, setChooseLocation] = useState<Location | null>(null);

    const setPosition = () => {
        onPress([location.latitude, location.longitude]);

        onClose();
    };

    return (
        <Modal transparent animationType="slide" onRequestClose={onClose}>
            <ModalBack>
                <ModalWrapper>
                    <TitleContainer>
                        <ModalText>
                            {selectFavoritePlace
                                ? "Segure o pino e arraste até o local favorito desejado"
                                : "Segure o pino e arraste até o local da ocorrência desejado"}
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
                        >
                            <Marker
                                coordinate={location}
                                draggable
                                onDragEnd={(e) => {
                                    const {
                                        latitude,
                                        longitude,
                                    } = e.nativeEvent.coordinate;
                                    setChooseLocation({ latitude, longitude });
                                    updateLocation({
                                        ...location,
                                        latitude,
                                        longitude,
                                    });
                                }}
                            />
                        </StayNormalMap>
                    </MapContainer>
                    <DoneButtonContainer>
                        <DoneButton
                            disabled={chooseLocation === null}
                            onPress={setPosition}
                        >
                            <Feather
                                name="map-pin"
                                size={scale(16)}
                                color={theme.primaryWhite}
                            />
                            <ButtonWithIconLabel>Pronto</ButtonWithIconLabel>
                        </DoneButton>
                    </DoneButtonContainer>
                </ModalWrapper>
            </ModalBack>
        </Modal>
    );
};

export default SelectPointOnMap;

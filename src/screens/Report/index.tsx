import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTheme } from "styled-components";

import SelectPointOnMap from "../../components/SelectPointOnMap";
import Logo from "../../img/logo.svg";
import { scale } from "../../utils/scalling";
import { AlertButton, ButtonContainer } from "./styles";

const Report: React.FC = () => {
    return null;
};

export default Report;

export const ReportButton = () => {
    const navigation = useNavigation();

    const theme = useTheme();

    const [openModal, setOpenModal] = useState(false);

    return (
        <ButtonContainer>
            <AlertButton onPress={() => setOpenModal(true)}>
                <Logo
                    width={scale(35)}
                    height={scale(35)}
                    fill={theme.primaryRed}
                />
            </AlertButton>
            {openModal && (
                <SelectPointOnMap
                    selectFavoritePlace={false}
                    onPress={(position: number[]) =>
                        navigation.navigate("Occurrence", {
                            latitude: position[0],
                            longitude: position[1],
                        })
                    }
                    onClose={() => setOpenModal(false)}
                />
            )}
        </ButtonContainer>
    );
};

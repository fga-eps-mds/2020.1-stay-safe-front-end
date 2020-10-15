import { Feather } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "styled-components";

import { scale } from "../../utils/scalling";
import { AlertButton, ButtonContainer } from "./styles";

const Report: React.FC = () => {
    return null;
};

export default Report;

export const ReportButton = (props: { navObject: any }) => {
    const { navObject } = props;

    const theme = useTheme();

    // Pass the param to open the modal in Home screen
    const handleOccurrence = () => {
        navObject.navigate("Home", { showReportModal: true });
    };

    return (
        <ButtonContainer>
            <AlertButton onPress={() => handleOccurrence()}>
                <Feather
                    name="bell"
                    size={scale(24)}
                    color={theme.primaryWhite}
                />
            </AlertButton>
        </ButtonContainer>
    );
};

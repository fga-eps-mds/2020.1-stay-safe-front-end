import React from "react";
import { useTheme } from "styled-components";

import Logo from "../../img/logo.svg";
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
                <Logo
                    width={scale(35)}
                    height={scale(35)}
                    fill={theme.primaryRed}
                />
            </AlertButton>
        </ButtonContainer>
    );
};

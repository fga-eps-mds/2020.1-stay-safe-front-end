import { Feather } from "@expo/vector-icons";
import React from "react";

import { scale } from "../../utils/scalling";
import { AlertButton, ButtonContainer } from "./styles";
import Logo from '../../img/logo.svg';

const Report: React.FC = () => {
    return null;
};

export default Report;

export const ReportButton = (props: { navObject: any }) => {
    const { navObject } = props;

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
                />
            </AlertButton>
        </ButtonContainer>
    );
};

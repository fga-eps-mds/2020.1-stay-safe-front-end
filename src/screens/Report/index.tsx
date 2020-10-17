import React from "react";

import Logo from "../../img/logo.svg";
import { scale } from "../../utils/scalling";
import { AlertButton, ButtonContainer } from "./styles";

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
                <Logo width={scale(35)} height={scale(35)} />
            </AlertButton>
        </ButtonContainer>
    );
};

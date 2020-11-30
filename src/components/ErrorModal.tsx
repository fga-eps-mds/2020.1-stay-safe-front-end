import React from "react";

import StayAlert from "./StayAlert";

interface ErrorModalProps {
    show: boolean;
    message: [string, string];
    onPress: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, message, onPress }) => {
    return (
        <StayAlert
            show={show}
            title={message[0]}
            message={message[1]}
            showConfirmButton
            confirmText="Entendido"
            onConfirmPressed={onPress}
            onDismiss={onPress}
        />
    );
};

export default ErrorModal;

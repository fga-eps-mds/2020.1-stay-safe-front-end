import React from "react";

import { Alert } from "./styles";

interface StayAlertProps {
    show: boolean;
    title: string;
    message: string;
    showConfirmButton: boolean;
    confirmText: string;
    onConfirmPressed: () => void;
    showCancelButton?: boolean;
    cancelText?: string;
    onCancelPressed?: () => void;
    onDismiss: () => void;
}

const StayAlert: React.FC<StayAlertProps> = ({
    show,
    title,
    message,
    showConfirmButton,
    confirmText,
    onConfirmPressed,
    showCancelButton,
    cancelText,
    onCancelPressed,
    onDismiss,
}) => {
    return (
        <Alert
            show={show}
            title={title}
            message={message}
            showConfirmButton={showConfirmButton}
            confirmText={confirmText}
            onConfirmPressed={onConfirmPressed}
            showCancelButton={showCancelButton}
            cancelText={cancelText}
            onCancelPressed={onCancelPressed}
            onDismiss={onDismiss}
        />
    );
};

export default StayAlert;

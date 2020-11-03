import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import { LineDotsLoader } from "react-native-indicator";
import { useTheme } from "styled-components";

import { LoaderWrapper, ModalBack } from "./styles";

interface CircularLoaderProps {
    size?: number;
    color?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
    size = 36,
    color = "",
}) => {
    const theme = useTheme();

    return (
        <Modal transparent animationType="fade">
            <ModalBack>
                <LoaderWrapper>
                    {/* <ActivityIndicator
                        size={size}
                        color={color === "" ? theme.primaryLightBlue : color}
                    /> */}
                    <LineDotsLoader size={20} />
                </LoaderWrapper>
            </ModalBack>
        </Modal>
    );
};

export default CircularLoader;

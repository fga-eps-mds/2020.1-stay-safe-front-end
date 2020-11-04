import React from "react";
import { Modal } from "react-native";
import { DotsLoader } from "react-native-indicator";
import { useTheme } from "styled-components";

import { scale } from "../../utils/scalling";
import { LoaderWrapper, ModalBack } from "./styles";

interface LoaderProps {
    size?: number;
    color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 25, color = "" }) => {
    const theme = useTheme();

    return (
        <Modal transparent animationType="fade">
            <ModalBack>
                <LoaderWrapper>
                    <DotsLoader
                        size={size}
                        color={color === "" ? theme.primaryLightBlue : color}
                        betweenSpace={scale(7)}
                    />
                </LoaderWrapper>
            </ModalBack>
        </Modal>
    );
};

export default Loader;

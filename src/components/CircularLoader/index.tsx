import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Container } from "./styles";

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
        <Container>
            <ActivityIndicator
                size={size}
                color={color === "" ? theme.primaryLightBlue : color}
            />
        </Container>
    );
};

export default CircularLoader;

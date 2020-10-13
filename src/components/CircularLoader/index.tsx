import React from "react";
import { ActivityIndicator } from "react-native";

import { Container } from "./styles";

interface CircularLoaderProps {
    size?: number;
    color?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
    size = 36,
    color = "#7DBFE2",
}) => {
    return (
        <Container>
            <ActivityIndicator size={40} color={color} />
        </Container>
    );
};

export default CircularLoader;

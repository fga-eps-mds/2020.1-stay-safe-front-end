import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";

import { NormalButton } from "./styles";

interface ButtonProps {
    width?: string;
    color: string;
    enabled?: boolean;
    isEditing?: boolean;
    settings?: boolean;
    borderRadius?: number;
    onPress?: () => void;
}

const Button: React.FC<ButtonProps & RectButtonProperties> = ({
    width = "80%",
    children,
    color,
    enabled = true,
    isEditing = false,
    settings = false,
    onPress,
    borderRadius = 28,
    ...props
}) => {
    return (
        <NormalButton
            color={color}
            width={width}
            onPress={onPress}
            enabled={enabled}
            settings={settings}
            isEditing={isEditing}
            borderRadius={borderRadius}
            {...props}
        >
            {children}
        </NormalButton>
    );
};

export default Button;

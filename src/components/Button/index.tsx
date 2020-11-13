import React from "react";
import { RectButtonProperties } from 'react-native-gesture-handler';

import { NormalButton } from "./styles";

interface ButtonProps {
    width: string;
    color?: string;
    enabled?: boolean;
    isEditing?: boolean;
    settings?: boolean;
    onPress?: () => void; 
}

const Button: React.FC<ButtonProps & RectButtonProperties> = ({
    width = '80%',
    children,
    color = null,
    enabled = true,
    isEditing = false,
    settings = false,
    onPress,
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
            {...props}
        >
            {children}
        </NormalButton>
    );
};

export default Button;
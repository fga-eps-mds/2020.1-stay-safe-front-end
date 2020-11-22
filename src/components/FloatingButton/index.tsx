import React from "react";

import { FloatingButtonStyled } from "./styles";

interface FloatingButtonProps {
    onPress(): void;
    position: "right-bottom" | "right-top";
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
    onPress,
    children,
    position,
}) => {
    return (
        <FloatingButtonStyled onPress={onPress} position={position}>
            {children}
        </FloatingButtonStyled>
    );
};

export default FloatingButton;

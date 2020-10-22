import React from "react";
import { LogoWrapper } from "./NormalForms";
import Logo from "../img/logo.svg";
import { scale } from "../utils/scalling";
import { useTheme } from "styled-components";

const LogoContainer = (props) => {
    const theme = useTheme();

    return (
        <LogoWrapper>
            <Logo
                width={scale(75)}
                height={scale(75)}
                fill={theme.primaryRed}
            />
        </LogoWrapper>
    )
};

export default LogoContainer;

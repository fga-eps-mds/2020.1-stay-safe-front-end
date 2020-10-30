import React from "react";
import { useTheme } from "styled-components";

import Logo from "../img/logo.svg";
import { scale } from "../utils/scalling";
import { LogoWrapper } from "./NormalForms";

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
    );
};

export default LogoContainer;

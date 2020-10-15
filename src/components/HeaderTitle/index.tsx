import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTheme } from "styled-components";

import { scale } from "../../utils/scalling";
import { HeaderTitleContainer, Title, GoBackContainer } from "./styles";

interface HeaderTitleProps {
    text: string;
    goBack?: boolean;
    onPressGoBack?: Function;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
    text,
    goBack = false,
    onPressGoBack = null,
}) => {
    const navigation = useNavigation();
    const theme = useTheme();

    return (
        <HeaderTitleContainer>
            {goBack && (
                <GoBackContainer>
                    <Feather
                        onPress={() => {
                            if (onPressGoBack != null) {
                                onPressGoBack();
                            } else {
                                navigation.goBack();
                            }
                        }}
                        name="arrow-left"
                        size={scale(28)}
                        color={theme.primarySuperDarkBlue}
                    />
                </GoBackContainer>
            )}
            <Title>{text}</Title>
        </HeaderTitleContainer>
    );
};

export default HeaderTitle;

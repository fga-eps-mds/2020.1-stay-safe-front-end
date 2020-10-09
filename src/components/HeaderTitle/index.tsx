import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

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
                        color="#010A26"
                    />
                </GoBackContainer>
            )}
            <Title>{text}</Title>
        </HeaderTitleContainer>
    );
};

export default HeaderTitle;

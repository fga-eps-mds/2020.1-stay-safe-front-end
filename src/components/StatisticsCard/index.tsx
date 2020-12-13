import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { scale } from "../../utils/scalling";
import {
    StatisticsContainer,
    DropDownContainer,
    TitleContainer,
    Title,
    Statistics,
    DropDown,
    StatsContainer,
    StatsText,
    StatsBar,
    StatsBarNumber,
} from "./styles";

interface DropDownItem {
    label: string;
    value: string;
}

interface StatisticsCardProps {
    dropdownTitle: string;
    dropdownWidth: string;
    dropdownItems: Array<DropDownItem>;
    dropdownDefaultValue: string;
    onChangeItem: (item: DropDownItem) => void;
    higherStatistic: number;
    isCityStatisticScreen?: boolean;
    flatlistData: Array;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
    dropdownTitle,
    dropdownWidth,
    dropdownItems,
    dropdownDefaultValue,
    onChangeItem,
    higherStatistic,
    isCityStatisticScreen = false,
    flatlistData,
}) => {
    const theme = useTheme();

    const getQuantity = (item) => {
        let quantity = 0;
        if (isCityStatisticScreen) {
            quantity = item.quantity;
        } else {
            quantity = item.crimes[0].quantity;
        }

        return quantity;
    };

    const getText = (item) => {
        let text = "";
        if (isCityStatisticScreen) {
            text = item.nature;
        } else {
            text = item.name;
        }
        return text;
    };

    return (
        <StatisticsContainer style={{ elevation: 5 }}>
            <DropDownContainer>
                <TitleContainer>
                    <Feather
                        name="calendar"
                        size={scale(18)}
                        color={theme.primaryRed}
                    />
                    <Title>{dropdownTitle}</Title>
                </TitleContainer>
                <DropDown
                    items={dropdownItems}
                    containerStyle={{
                        height: scale(42),
                        width: dropdownWidth,
                    }}
                    dropDownMaxHeight={scale(350)}
                    defaultValue={dropdownDefaultValue}
                    onChangeItem={onChangeItem}
                />
            </DropDownContainer>
            <Statistics>
                {flatlistData.lenght !== 0 ? (
                    <FlatList
                        data={flatlistData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            const quantity = getQuantity(item);
                            const percentage =
                                (quantity / higherStatistic) * 100.0;

                            return (
                                <StatsContainer key={index}>
                                    <StatsText>{getText(item)}</StatsText>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                        }}
                                    >
                                        <StatsBar percentage={percentage} />
                                        <StatsBarNumber>
                                            {quantity.toFixed(2)}
                                        </StatsBarNumber>
                                    </View>
                                </StatsContainer>
                            );
                        }}
                    />
                ) : (
                    <Title
                        style={{ textAlign: "center", marginTop: scale(20) }}
                    >
                        Os dados não estão disponíveis no momento.
                    </Title>
                )}
            </Statistics>
        </StatisticsContainer>
    );
};

export default StatisticsCard;

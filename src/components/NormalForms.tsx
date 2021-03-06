import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import { scale } from "../utils/scalling";

export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.primaryBackground};
`;

export const KeyboardScrollView = styled(KeyboardAwareScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: "5%",
    },
})``;

export const LogoWrapper = styled.View`
    align-items: center;
    margin-top: 5%;
    margin-bottom: 8%;
`;

export const Title = styled.Text`
    width: 80%;
    font-family: Trueno-SemiBold;
    font-size: ${scale(18)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    margin-bottom: 12%;
    text-align: left;
`;

export const NormalLabel = styled.Text`
    width: 80%;
    font-family: Trueno-SemiBold;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primaryDarkBlue};
    text-align: left;
    margin-bottom: ${scale(14)}px;
    margin-left: ${scale(10)}px;
`;

export const NormalInput = styled.TextInput.attrs((props) => ({
    placeholderTextColor: props.theme.primaryLightGray,
    autoCapitalize: "none",
    multiline: false,
}))`
    width: 80%;
    height: ${scale(42)}px;
    background-color: ${(props) => props.theme.primaryWhite};
    border-radius: ${scale(15)}px;
    font-family: Trueno-Regular;
    font-size: ${scale(14)}px;
    color: ${(props) => props.theme.primarySuperDarkBlue};
    margin-bottom: ${scale(20)}px;
    padding: 0 ${scale(14)}px;
`;

export const ButtonLabel = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: ${scale(14)}px;
    color: ${(props) =>
        props.theme.type === "dark"
            ? props.theme.primaryBlack
            : props.theme.primaryWhite};
`;

export const ButtonWithIconLabel = styled(ButtonLabel)`
    margin-left: ${scale(10)}px;
`;

export const InputWithIcon = styled.View`
    width: 80%;
    height: ${scale(42)}px;
    border-radius: ${scale(15)}px;
    flex-direction: row;
    position: relative;
    align-items: center;
    justify-content: space-between;
`;

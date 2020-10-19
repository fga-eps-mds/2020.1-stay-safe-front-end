import AwesomeAlert from "react-native-awesome-alerts";
import styled from "styled-components";

import { scale } from "../../utils/scalling";

export const Alert = styled(AwesomeAlert).attrs((props) => ({
    overlayStyle: {
        backgroundColor: props.theme.primaryBlack,
        opacity: 0.5,
    },
    progressColor: props.theme.primaryRed,
    contentContainerStyle: {
        backgroundColor: props.theme.primaryWhite,
        borderRadius: scale(16),
        padding: scale(16),
    },
    titleStyle: {
        fontFamily: "Trueno-SemiBold",
        fontSize: scale(16),
        color: props.theme.primarySuperDarkBlue,
        paddingVertical: 0,
        paddingHorizontal: 0,
        paddingBottom: props.showProgress ? 0 : scale(16),
    },
    messageStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(14),
        color: props.theme.primaryDarkBlue,
        paddingTop: 0,
        textAlign: "center",
    },
    confirmButtonColor: props.theme.primaryRed,
    confirmButtonStyle: {
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(8),
    },
    confirmButtonTextStyle: {
        fontFamily: "Trueno-SemiBold",
        fontSize: scale(12),
    },
    cancelButtonColor: props.theme.primaryLightBlue,
    cancelButtonStyle: {
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(8),
    },
    cancelButtonTextStyle: {
        fontFamily: "Trueno-SemiBold",
        fontSize: scale(12),
    },
}))``;

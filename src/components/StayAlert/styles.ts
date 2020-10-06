import AwesomeAlert from "react-native-awesome-alerts";
import styled from "styled-components";

import { scale } from "../../utils/scalling";

export const Alert = styled(AwesomeAlert).attrs((props) => ({
    overlayStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    progressColor: "#E83338",
    contentContainerStyle: {
        borderRadius: scale(16),
        padding: scale(16),
    },
    titleStyle: {
        fontFamily: "Trueno-SemiBold",
        fontSize: scale(16),
        color: "#010A26",
        paddingVertical: 0,
        paddingHorizontal: 0,
        paddingBottom: props.showProgress ? 0 : scale(16),
    },
    messageStyle: {
        fontFamily: "Trueno-Regular",
        fontSize: scale(14),
        color: "#011640",
        paddingTop: 0,
        textAlign: "center",
    },
    confirmButtonColor: "#E83338",
    confirmButtonStyle: {
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(8),
    },
    confirmButtonTextStyle: {
        fontFamily: "Trueno-SemiBold",
        fontSize: scale(12),
    },
    cancelButtonColor: "#7DBFE2",
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
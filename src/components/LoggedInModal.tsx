import * as Font from "expo-font";
import React, { useEffect, useState } from "react";

import { useUser } from "../hooks/user";
import StayAlert from "./StayAlert";

const LoggedInModal = (props) => {
    const { data } = useUser();
    const [showAlert, changeAlert] = useState(false);
    const { navObject } = props;

    const [loaded] = Font.useFonts({
        "Trueno-SemiBold": require("../fonts/TruenoSBd.otf"),
        "Trueno-Regular": require("../fonts/TruenoRg.otf"),
    });

    const verifyUserLoggedIn = async () => {
        if (data.token === "" && data.username === "") {
            changeAlert(true);
        }
    };

    useEffect(() => {
        verifyUserLoggedIn();
    });

    if (!loaded) return null;

    return (
        <StayAlert
            show={showAlert}
            title="Você não está logado"
            message="Faça login para poder utilizar todas as funcionalidades do app."
            showConfirmButton
            confirmText="Fazer login"
            onConfirmPressed={() => {
                changeAlert(false);
                navObject.navigate("Login");
            }}
            showCancelButton
            cancelText="Fechar"
            onCancelPressed={() => {
                changeAlert(false);
            }}
        />
    );
};

export default LoggedInModal;

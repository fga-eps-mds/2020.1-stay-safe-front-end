import { Alert } from "react-native";

interface UpdateUserFields {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const validateUpdateUser = (data: UpdateUserFields) => {
    const error = ["Campo Inválido", ""];
    if (data.fullName === null || data.fullName === "") {
        error[1] = "Nome Completo não pode ficar em branco";
    } else if (data.email === null || data.email === "") {
        error[1] = "Email não pode ficar em branco";
    } else if (data.email.length < 6) {
        error[1] = "Email precisa de mínimo de 6 (seis) caracteres";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        error[1] = "Email inválido";
    }
    if (data.password !== null && data.password !== "") {
        if (data.password && data.password.length < 6) {
            error[1] = "Senha precisa de mínimo de 6 (seis) caracteres";
        } else if (!/.*[0-9].*/.test(data.password)) {
            error[1] = "Senha precisa conter no mínimo 1(um) número";
        } else if (data.password !== data.confirmPassword) {
            error[1] = "As senhas precisam ser iguais";
        }
    }
    if (error[1] !== "") {
        Alert.alert(error[0], error[1]);
    }
    return error[1] === "";
};

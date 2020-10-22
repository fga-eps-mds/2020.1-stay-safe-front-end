import { Alert } from "react-native";

interface UserProps {
    username?: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const validateUser = (data: UserProps) => {
    const error = ["Campo Inválido", ""];
    let usernameError = "";
    if (data.hasOwnProperty("username")) {
        usernameError = usernameInvalid(data.username);
    }
    const nameError = nameInvalid(data.fullName);
    const emailError = emailInvalid(data.email);
    const passwordError = passwordInvalid(data.password, data.confirmPassword);

    if (usernameError) {
        error[1] = usernameError;
    } else if (nameError) {
        error[1] = nameError;
    } else if (emailError) {
        error[1] = emailError;
    } else if (passwordError) {
        error[1] = passwordError;
    }

    if (error[1] !== "") {
        Alert.alert(error[0], error[1]);
    }
    return error[1] === "";
};

const usernameInvalid = (username) => {
    let error = "";
    if (username === null || username === "") {
        error = "Username não pode ficar em branco";
    } else if (username.length < 3) {
        error = "Username precisa de mínimo de 3 (três) caracteres";
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        error = "Username não pode ter espaços e caracteres especiais.";
    }
    return error;
};

const nameInvalid = (name: string) => {
    let error = "";
    if (name === null || name === "") {
        error = "Nome Completo não pode ficar em branco";
    }
    return error;
};

const emailInvalid = (email: string) => {
    let error = "";
    if (email === null || email === "") {
        error = "Email não pode ficar em branco";
    } else if (email.length < 6) {
        error = "Email precisa de mínimo de 6 (seis) caracteres";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        error = "Email inválido";
    }
    return error;
};

const passwordInvalid = (password: string, confirmPassword: string) => {
    let error = "";
    if (password === null || password === "") {
        error = "Senha não pode ficar em branco";
    } else if (password && password.length < 6) {
        error = "Senha precisa de mínimo de 6 (seis) caracteres";
    } else if (!/.*[0-9].*/.test(password)) {
        error = "Senha precisa conter no mínimo 1(um) número";
    } else if (password !== confirmPassword) {
        error = "As senhas precisam ser iguais";
    }
    return error;
};

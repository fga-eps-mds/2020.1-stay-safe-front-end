import {
    validateRequiredField,
    validateFieldLength,
    validateRegexField,
} from "./validateField";

interface UserProps {
    username?: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const validateUser = (data: UserProps) => {
    let error = "";
    let usernameError = "";
    let passwordError = "";
    if (data.hasOwnProperty("username")) {
        usernameError = usernameInvalid(data.username);
        passwordError = passwordInvalid(data.password, data.confirmPassword);
    }
    const nameError = nameInvalid(data.fullName);
    const emailError = emailInvalid(data.email);

    if (usernameError) {
        error = usernameError;
    } else if (nameError) {
        error = nameError;
    } else if (emailError) {
        error = emailError;
    } else if (passwordError) {
        error = passwordError;
    }

    return error;
};

const usernameInvalid = (username) => {
    let error = "";
    if (validateRequiredField(username)) {
        error = "Username não pode ficar em branco";
    } else if (validateFieldLength(username, 3)) {
        error = "Username precisa de mínimo de 3 (três) caracteres";
    } else if (validateRegexField(username, /^[a-zA-Z0-9]+$/)) {
        error = "Username não pode ter espaços e caracteres especiais.";
    }
    return error;
};

const nameInvalid = (name: string) => {
    let error = "";
    if (validateRequiredField(name)) {
        error = "Nome Completo não pode ficar em branco";
    }
    return error;
};

const emailInvalid = (email: string) => {
    let error = "";
    if (validateRequiredField(email)) {
        error = "Email não pode ficar em branco";
    } else if (validateFieldLength(email, 6)) {
        error = "Email precisa de mínimo de 6 (seis) caracteres";
    } else if (validateRegexField(email, /\S+@\S+\.\S+/)) {
        error = "Email inválido";
    }
    return error;
};

const passwordInvalid = (password: string, confirmPassword: string) => {
    let error = "";
    if (validateRequiredField(password)) {
        error = "Senha não pode ficar em branco";
    } else if (validateFieldLength(password, 6)) {
        error = "Senha precisa de mínimo de 6 (seis) caracteres";
    } else if (validateRegexField(password, /.*[0-9].*/)) {
        error = "Senha precisa conter no mínimo 1(um) número";
    } else if (password !== confirmPassword) {
        error = "As senhas precisam ser iguais";
    }
    return error;
};

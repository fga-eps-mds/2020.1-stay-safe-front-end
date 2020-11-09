import base64 from "react-native-base64";

import { userApi } from "./api";

interface UserProps {
    full_name: string;
    username: string;
    email: string;
    password: string;
}

interface authUserProps {
    username: string;
    password?: string;
}

export const authUser = async (data: authUserProps) => {
    const response = await fetch(userApi + "/auth/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${base64.encode(
                `${data.username}:${data.password}`
            )}`,
        },
    });
    return {
        status: response.status,
        body: await response.json(),
    };
};

export const getAllUsers = async () => {
    return await fetch(userApi + "/users/", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
};

export const getUser = async (username: string) => {
    const response = await fetch(userApi + "/users/" + username, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    return {
        status: response.status,
        body: await response.json(),
    };
};

export const createUser = async (data: UserProps) => {
    const response = await fetch(userApi + "/users/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            full_name: data.full_name,
            username: data.username,
            email: data.email,
            password: data.password,
        }),
    });
    return {
        status: response.status,
        body: await response.json(),
    };
};

export const updateUser = async (data: UserProps, token: string) => {
    const response = await fetch(userApi + "/users/", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data),
    });

    return {
        status: response.status,
        body: await response.json(),
    };
};

export const deleteUser = async (token: string) => {
    return await fetch(userApi + "/users/", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });
};

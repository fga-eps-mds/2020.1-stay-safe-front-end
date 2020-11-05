import { userApi } from "./api";

export const getFavoritePlaces = async (token: string) => {
    const response = await fetch(userApi + `/places/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `${token}`,
        },
    });
    return { status: response.status, body: await response.json() };
};

import { userApi } from "./api";

interface FavoritePlace {
    name: string;
    latitude: number;
    longitude: number;
}

export const createFavoritePlace = async (
    data: FavoritePlace,
    token: string
) => {
    const response = await fetch(userApi + "/places/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify({
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
        }),
    });

    return { status: response.status, body: await response.json() };
};

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

export const deleteFavoritePlace = async (idPlace: number, token: string) => {
    const response = await fetch(userApi + `/places/${idPlace}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `${token}`,
        },
    });
    return { status: response.status };
};

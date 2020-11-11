import { userApi } from "./api";

interface Neighborhood {
    city: string,
    id_neighborhood: number,
    neighborhood: string,
    state: string
}

export const getAllNeighborhoods = async () => {
    const response = await fetch (userApi + `/neighborhood`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        },
    });

    return { status: response.status, body: await response.json() };
}

export const getNeighborhoodByState = async (state: string) => {
    const response = await fetch (userApi + `/neighborhood?state=${state}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        },
    });

    return { status: response.status, body: await response.json() };
}

export const getNeighborhoodByCity = async (city: string) => {
    const response = await fetch (userApi + `/neighborhood?city=${city}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        },
    });

    return { status: response.status, body: await response.json() };
}
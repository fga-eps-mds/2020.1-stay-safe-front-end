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
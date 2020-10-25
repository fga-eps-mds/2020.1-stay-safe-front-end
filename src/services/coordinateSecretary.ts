import { secretaryApi } from "./api";

export const getCoordinates = async (uf: string) => {
    const response = await fetch(secretaryApi + `/coordinates?state=${uf}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return { status: response.status, body: await response.json() };
};

import { secretaryApi } from "./api";

export const getOccurrencesByCrimeNature = async (
    uf: string,
    crime: string
) => {
    const response = await fetch(
        secretaryApi + `?secretary=${uf}&crime=${crime}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    return { status: response.status, body: await response.json() };
};

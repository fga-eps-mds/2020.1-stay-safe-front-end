import { secretaryApi } from "./api";

export const getOccurrencesByCrimeNature = async (
    uf: string,
    crime: string,
    initialMonth: string,
    finalMonth: string,
    perCapita: number
) => {
    const response = await fetch(
        secretaryApi +
            `/crimes?secretary=${uf}&initial_month=${initialMonth}&final_month=${finalMonth}&nature=${crime}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                per_capita: perCapita,
            },
        }
    );
    return { status: response.status, body: await response.json() };
};

export const getAllOccurrencesOfCity = async (
    uf: string,
    city: string,
    initialMonth: string,
    finalMonth: string
) => {
    const response = await fetch(
        secretaryApi +
            `/crimes?secretary=${uf}&city=${city}&initial_month=${initialMonth}&final_month=${finalMonth}`,
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

export const getAllOccurrence = async (
    uf: string,
    initialMonth: string,
    finalMonth: string,
    perCapita: number
) => {
    const response = await fetch(
        secretaryApi +
            `/crimes?secretary=${uf}&initial_month=${initialMonth}&final_month=${finalMonth}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                per_capita: perCapita,
            },
        }
    );
    return { status: response.status, body: await response.json() };
};

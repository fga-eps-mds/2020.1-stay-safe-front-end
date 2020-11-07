import { userApi } from "./api";

export const getCityNeighborhoods = async (city: string, state: string) => {
    const response = await fetch(
        userApi + `/neighborhood?city=${city}&state=${state}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );

    return { status: response.status, body: await response.json() };
};

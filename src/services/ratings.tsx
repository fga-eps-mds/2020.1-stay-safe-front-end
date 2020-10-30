import { userApi } from "./api";

interface Rating {
    id_neighborhood: number,
    rating_neighborhood: number,
    lighting: boolean,
    movement_of_people: boolean,
    police_rounds: boolean,
    details: string
}

export const getUserRatings = async (username: string) => {
    if (username && username !== '') {
        const response = await fetch (userApi + `/rating?user=${username}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            },
        });

        return { status: response.status, body: await response.json() };
    }
}

export const deleteRating = async (id: number, token: string) => {
    const response = await fetch(userApi + `rating/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `${token}`,
        },
    });

    return { status: response.status };
};
import { userApi } from "./api";

interface Rating {
    rating_neighborhood: number,
    lighting: boolean,
    movement_of_people: boolean,
    police_rounds: boolean,
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
    const response = await fetch(userApi + `/rating/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `${token}`,
        },
    });

    return { status: response.status };
};

export const updateRating = async (
    id: number,
    token: string,
    data: Rating
) => {
    const response = await fetch(userApi + `/rating/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rating_neighborhood: data.rating_neighborhood,
            lighting: data.lighting,
            movement_of_people: data.movement_of_people,
            police_rounds: data.police_rounds,
        }),
    });

    return { status: response.status, body: {} };
};

export const createRating = async (
    id: number,
    token: string,
    data: Rating
) => {
    const response = await fetch(userApi + `/rating/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify({
            rating_neighborhood: data.rating_neighborhood,
            lighting: data.lighting,
            movement_of_people: data.movement_of_people,
            police_rounds: data.police_rounds,
        }),
    });

    return { status: response.status, body: await response.json() };
};
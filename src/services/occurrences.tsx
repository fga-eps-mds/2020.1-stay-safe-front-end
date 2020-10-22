import { userApi } from "./api";

interface OccurrenceProps {
    gun: string;
    location: [number, number];
    occurrence_date_time: string;
    occurrence_type: string;
    physical_aggression: boolean | undefined;
    police_report: boolean | undefined;
    victim: boolean | undefined;
}

export const createOccurrence = async (
    data: OccurrenceProps,
    token: string
) => {
    const response = await fetch(userApi + "/occurrences/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: occurrenceToJSON(data),
    });

    return { status: response.status, body: await response.json() };
};

export const getAllUsersOccurrences = async (occurrence_type?: string) => {
    if (occurrence_type && occurrence_type !== "") {
        const response = await fetch(
            userApi + `/occurrences?occurrence_type=${occurrence_type}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        return { status: response.status, body: await response.json() };
    }

    const response = await fetch(userApi + "/occurrences", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    return { status: response.status, body: await response.json() };
};

export const getUserOccurrences = async (username: string) => {
    const response = await fetch(userApi + `/occurrences?user=${username}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    return { status: response.status, body: await response.json() };
};

export const deleteOccurrence = async (id: number, token: string) => {
    const response = await fetch(userApi + `/occurrences/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `${token}`,
        },
    });

    return { status: response.status };
};

export const updateOccurrence = async (
    id: number,
    token: string,
    data: OccurrenceProps
) => {
    const response = await fetch(userApi + `/occurrences/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: occurrenceToJSON(data),
    });

    return { status: response.status, body: {} };
};

let occurrenceToJSON = (data: OccurrenceProps): string => {
    return JSON.stringify({
        gun: data.gun,
        location: data.location,
        occurrence_date_time: data.occurrence_date_time,
        occurrence_type: data.occurrence_type,
        physical_aggression: data.physical_aggression,
        police_report: data.police_report,
        victim: data.victim,
    })
};

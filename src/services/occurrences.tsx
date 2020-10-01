import { userApi } from "./api";

interface CreateOccurrenceProps {
    gun: string;
    location: [number, number];
    occurrence_date_time: string;
    occurrence_type: string;
    physical_aggression: boolean;
    police_report: boolean;
    victim: boolean;
}

export const createOccurrence = async (
    data: CreateOccurrenceProps,
    token: string
) => {
    const response = await fetch(userApi + "/occurrences/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify({
            gun: data.gun,
            location: data.location,
            occurrence_date_time: data.occurrence_date_time,
            occurrence_type: data.occurrence_type,
            physical_aggression: data.physical_aggression,
            police_report: data.police_report,
            victim: data.victim,
        }),
    });
    return {
        status: response.status,
        body: await response.json(),
    };
};

export const getAllUsersOccurrences = async () => {
    const response = await fetch(userApi + "/occurrences", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    return {
        status: response.status,
        body: await response.json(),
    };
};

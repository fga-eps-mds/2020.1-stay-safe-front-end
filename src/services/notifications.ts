import { userApi } from "./api";
import { occurrenceToJSON, OccurrenceProps } from "./occurrences";

export const sendNotificationNearFavoritePlace = async (
    data: OccurrenceProps,
    token: string
) => {
    const response = await fetch(userApi + "/notification-places/", {
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

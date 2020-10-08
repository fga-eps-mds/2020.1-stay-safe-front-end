export const getFormattedDate = (date: string, separator: string) => {
    date = date.split(" ", 1).toString();
    const formattedDate = date.split("-");
    return (
        formattedDate[2] +
        separator +
        formattedDate[1] +
        separator +
        formattedDate[0]
    );
};

export const getOcurrenceDateTime = (datetime: string) => {
    const [date, time] = datetime.split(" ");
    const [year, month, day] = date.split("-");
    const [hour, minutes, seconds] = time.split(":");

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minutes),
        Number(seconds)
    );
};

export const formatDateTime = (datetime: Date) => {
    const date = datetime.toLocaleDateString().split("/");
    const time = datetime.toLocaleTimeString();

    const month = date[0];
    const day = date[1];
    const year = `20${date[2]}`;

    const formatedDatetime = `${year}-${month}-${day} ${time}`;

    return formatedDatetime;
};

export const formatDate = (date: Date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const formatedDate = `${day}/${month}/${year}`;

    return formatedDate;
};

export const formatTime = (date: Date) => {
    const hour = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const formatedTime = `${hour}:${minutes}`;

    return formatedTime;
};

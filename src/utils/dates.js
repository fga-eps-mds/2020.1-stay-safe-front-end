export const getFormattedDate = (date, separator) => {
    let formattedDate = date.split(' ', 1).toString()
    formattedDate = formattedDate.split('-')
    return formattedDate[2] + separator + formattedDate[1] + separator + formattedDate[0]
}

export const formatDateTime = (datetime) => {
    const [date, time] = datetime.split(" ")
    const [year, month, day] = date.split("-")
    const [hour, minutes, seconds] = time.split(":")

    return new Date(year, month-1, day, hour, minutes, seconds)
}
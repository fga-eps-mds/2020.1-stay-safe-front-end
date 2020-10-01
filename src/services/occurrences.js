import { userApi } from './api'

export const createOccurrence = async (data, token) => {
    const response = await fetch(userApi + '/occurrences/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({
            gun: data.gun,
            location: data.location,
            occurrence_date_time: data.occurrence_date_time,
            occurrence_type: data.occurrence_type,
            physical_aggression: data.physical_aggression,
            police_report: data.police_report,
            victim: data.victim
        })
    })
    return { status: response.status, body: await response.json() }
}

export const getOccurrences = async (username) => {
    const response = await fetch(userApi + `/occurrences?user=${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return { status: response.status, body: await response.json() }
}

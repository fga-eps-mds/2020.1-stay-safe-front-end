import { Alert } from 'react-native'

export const validateOccurrence = (data) => {
    const currentDate = new Date()
    let error = ['Campo Inválido', '']
    if (data.occurrenceType === null || data.occurrenceType === '') {
        error[1] = 'Tipo de Ocorrência deve ser selecionado'
    }
    else if (data.gun === null || data.gun === '') {
        error[1] = 'Tipo de Arma deve ser selecionado'
    }
    else if (data.victim === null) {
        error[1] = 'Vitima deve ser selecionado'
    }
    else if (data.physicalAggression === null) {
        error[1] = 'Agressão fisica deve ser selecionado'
    }
    else if (data.policeReport === null) {
        error[1] = 'Boletim de ocorrência deve ser selecionado'
    }
    else if (currentDate < data.occurrenceDateTime) {
        error[1] = 'O horário selecionado é maior que o atual'
    }
    error[1] !== '' ? Alert.alert(error[0], error[1]) : null
    return error[1] === '' ? true : false
}
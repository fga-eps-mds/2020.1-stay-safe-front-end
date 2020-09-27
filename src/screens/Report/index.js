import React from 'react'
import { Feather } from '@expo/vector-icons'

import { AlertButton, ButtonContainer } from './styles'
import { scale } from '../../utils/scalling'

export default Report = () => {
    return null
}

export const ReportButton = (props) => {
    const { navObject } = props

    // Pass the param to open the modal in Home screen
    const handleOccurrence = () => {
        navObject.navigate('Home', { showReportModal: true })
    }

    return (
        <ButtonContainer>
            <AlertButton onPress={() => handleOccurrence()}>
                <Feather name='bell' size={scale(24)} color='#ffffff' />
            </AlertButton>
        </ButtonContainer>
    )
}
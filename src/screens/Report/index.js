import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'

import { AlertButton, ButtonContainer } from './styles'
import { scale } from '../../utils/scalling'

import LoggedInModal from '../../components/LoggedInModal'

export default Report = () => {
    return null
}

export const ReportButton = (props) => {
    const { navObject } = props
    const [showModal, setShowModal] = useState(false)

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
import styled from 'styled-components/native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Container = styled.View`
    flex: 1;
    background-color: #F0F0F5;
`;

export const KeyboardScrollView = styled(KeyboardAwareScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: '5%'
    }
})``;

export const Title = styled.Text`
    width: 80%;
    font-family: Trueno-SemiBold;
    font-size: 22px;
    color: #000000;
    margin-bottom: 10%;
    text-align: left;
`;
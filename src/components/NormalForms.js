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
})`
`;

export const LogoWrapper = styled.View`
    width: 80%;
    margin-top: 5%;
    margin-bottom: 10%;
`;

export const Title = styled.Text`
    width: 80%;
    font-family: Trueno-SemiBold;
    font-size: 22px;
    color: #011640;
    margin-bottom: 15%;
    text-align: left;
`;

export const NormalLabel = styled.Text`
    width: 80%;
    font-family: Trueno-SemiBold;
    font-size: 16px;
    color: #011640;
    text-align: left;
    margin-left: 20px;
    margin-bottom: 15px;
`;

export const NormalInput = styled.TextInput.attrs({
    placeholderTextColor: "#ffffff",
    autoCapitalize: 'none',
    multiline: false,
})`
    width: 80%;
    height: 50px;
    background-color: #ffffff;
    border-radius: 15px;
    font-family: Trueno-Regular;
    font-size: 16px;
    color: #010A26;
    margin-bottom: 25px;
    padding-horizontal: 14px;
`;

export const NormalSend = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    width: 80%;
    align-items: center;
    background-color: #E83338;
    border-radius: 30px;
    margin-top: 15px;
    padding: 14px;
`;

export const NormalCreate = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    width: 80%;
    align-items: center;
    background-color: #7DBFE2;
    border-radius: 30px;
    margin-top: 15px;
    padding: 14px;
`;

export const SendLabel = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: 16px;
    color: #ffffff;
`;
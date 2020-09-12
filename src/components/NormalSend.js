import styled from 'styled-components/native'

export default NormalSend = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    width: 80%;
    align-items: center;
    background-color: #E83338;
    border-radius: 30px;
    margin-top: 15px;
    padding: 14px;
`;

export const SendLabel = styled.Text`
    font-family: Trueno-SemiBold;
    font-size: 16px;
    color: #ffffff;
`;
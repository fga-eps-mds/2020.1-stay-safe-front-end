import styled from 'styled-components/native'

export default NormalInput = styled.TextInput.attrs({
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
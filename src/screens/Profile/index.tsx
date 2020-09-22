import React from 'react';
import * as Font from 'expo-font';
import { Container, Title } from './styles';


const Profile: React.FC = () => {
  const [loaded] = Font.useFonts({
      'Trueno-SemiBold': require('../../fonts/TruenoSBd.otf'),
      'Trueno-Regular': require('../../fonts/TruenoRg.otf'),
  });

  if(!loaded)
    return null;

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Title> oi tudo bem? </Title>    
    </Container> 
  );
}

export default Profile;
import React from 'react';

import { 
    HeaderContainer, 
    HeaderWrapper, 
    HeaderBackScreen, 
    HeaderTitle 
} from './styles'

interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderBackScreen>
                    {children}
                </HeaderBackScreen>
                <HeaderTitle>{title}</HeaderTitle>
            </HeaderWrapper>
        </HeaderContainer>
    )
}

export default Header
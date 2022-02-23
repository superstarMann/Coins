import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
font-size: 3rem;    
display: flex;
padding-left: 7.5rem;
padding-top: 3rem;
padding-bottom: 1.5rem;
justify-content: left;
align-self: center;
font-weight: bold;
`
interface IProps {
    name?: string;
}

export const TitleName:React.FC<IProps> = ({name = "Markets"}) => {
    return(
        <Title>{name}</Title>
    )
}
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atmos';

const Title = styled.div`
font-size: 3rem;    
display: flex;
padding-left: 7.5rem;
padding-right: 8rem;
padding-top: 3rem;
padding-bottom: 1.5rem;
justify-content: space-between;
align-self: center;
font-weight: bold;
background-color: ${props => props.theme.bgColors};
`

const ToggleBtn = styled.button`
border: none;
background-color: ${props => props.theme.textColor};
border-radius: 40px;
color: ${props => props.theme.bgColors};
padding: 10px;
`


interface IProps {
    name?: string;
}

export const TitleName:React.FC<IProps> = ({name = "Markets"}) => {
    const [light, setLight] = useState(true)
    const setDarkMode = useSetRecoilState(isDarkAtom)
    const ToggleMode = () => {
        setDarkMode(current => !current)
        setLight(current => !current)
    }
    return(
        <Title>
            <div>{name}</div>
            <ToggleBtn onClick={ToggleMode}>{light ? "Dark Mode" : "Light Mode"}</ToggleBtn>
        </Title>
    )
}
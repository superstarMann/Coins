import React from 'react'
import styled from 'styled-components'

const ILoader = styled.div`
display: flex;
justify-content: center;
padding-top:7rem;
font-size: 2.2rem;
`

interface IProps{
    actionText: string
}
export const Loader:React.FC<IProps> = ({actionText}) => {
    return(
        <ILoader>{actionText}</ILoader>
    )
}
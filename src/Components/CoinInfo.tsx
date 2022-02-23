import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
color: black;
width: 50%;
display: flex;
flex-direction: column;
justify-content: flex-start;
padding-top: 3rem;
padding-left: 4rem;
gap: 3rem;
`

const Contents = styled.div`
font-size: 1.6rem;
display: flex;
div{
    width: 50%;
    font-weight: bold;
}
span{
    width: 50%;
    opacity: 0.5;
    padding-left: 10px;
}
`

export const MiniTitle = styled.header`
font-size: 1.4rem;
font-weight: bold;
span{
    background-color: #6c5ce7;
    padding: 10px 5rem;
    border-radius: 10px;
    color: white;
}
`

interface IProps {
    rank?: number;
    market_cap?: number | undefined;
    circulating_supply?: number;
    total_supply?: number;
    max_supply?: number;
}
export const CoinInfo:React.FC<IProps> = ({rank, market_cap, circulating_supply, total_supply, max_supply}) => {
    return(
        <Container>
            <MiniTitle><span>Detail</span></MiniTitle>
            <Contents>
            <div>Market Cap Rank</div> <span>{rank}</span>
            </Contents>
            <Contents>
            <div>Market Cap</div> <span>{market_cap?.toLocaleString("KR")}$</span>
            </Contents>
            <Contents>
            <div>Circulating Supply</div> <span>{circulating_supply?.toLocaleString("KR")}</span>
            </Contents>
            <Contents>
            <div>Max Supply</div> <span>{max_supply?.toLocaleString("KR")}</span>
            </Contents>
            <Contents>
            <div>Total Supply</div> <span>{total_supply?.toLocaleString("KR")}</span>
            </Contents>
        </Container>
    )
}
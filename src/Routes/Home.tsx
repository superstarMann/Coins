import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { CoinsList } from '../Components/CoinsList';
import { Loader } from '../Components/Loader';
import { TitleName } from '../Components/TitleName';
import { PriceData } from '../interface';

export const DIV =styled.div`
background-color: ${props => props.theme.bgColors};
`

export const Container = styled.div`    
height: 100vh;  
background-color: ${props => props.theme.bgColors};
`

const Title = styled.div`
display: flex;
padding: 0px 7.5rem;
div {
    padding: 10px 20px;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColors};
    font-size: 1.3rem;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.textColor}
}
div:first-child {
    width: 30%;
}
div:nth-child(n + 2) {
    width: 17.5%;
}
`

export const MM = styled.div`
width: 100%;
padding: 0px 7.5rem;
background-color: ${props => props.theme.bgColors};
`

const Pagination = styled.div`
display: flex;
justify-content: flex-end;
padding-bottom: 100px;
font-size: 1.5rem;
padding-top: 40px;
font-weight: bold;
background-color: ${props => props.theme.bgColors};;
color: ${props => props.theme.textColor};
button{
    border: none;
    background-color: ${props => props.theme.bgColors};;
    padding: 0px 20px;
    font-size: 1rem;
    color: ${props => props.theme.textColor}
}
`

export const Home = () => {
    const [page, setPage] = useState(1)
    const {isLoading, data} = useQuery<PriceData[]>("allCoins", fetchCoins, {
        refetchInterval: 10000
      })
    const prevPage = () => {setPage(current => current === 1 ? 1 : current - 1)}
    const nextPage = () => {setPage(current => current === 20 ? 20 : current + 1)}
    return(
        <DIV>
        <TitleName/>
        <Container>
            <div>
            <Helmet><title>Coins</title></Helmet>
            <Title>
            <div>Name</div>
            <div>Price</div>
            <div>24h Change</div>
            <div>24h Volume</div>
            <div>Markey Cap</div>
            </Title>
            {isLoading ?  <Loader actionText='Loading...'/> : (
                <MM>
                {data?.slice(20 * (page - 1), 20 * page).map((coin) => (
                    <CoinsList 
                    id={coin.id}
                    name={coin.name}
                    percent_change_24h={coin.quotes.USD.percent_change_24h}
                    price={coin.quotes.USD.price.toFixed(4)}
                    volume_24h={coin.quotes.USD.volume_24h}
                    market_cap={coin.quotes.USD.market_cap}
                    symbol={coin.symbol}
                    />
                ))}
                <Pagination>
                    <button onClick={prevPage}>{`<<`}</button>
                    <span>{page} of 20 </span>
                    <button onClick={nextPage}>{`>>`}</button>
                </Pagination>
                </MM>
            )}
            </div>
        </Container>
        </DIV>
    )
}
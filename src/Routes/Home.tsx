import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { CoinsList } from '../Components/CoinsList';
import { Loader } from '../Components/Loader';
import { PriceData } from '../interface';

const Container = styled.div`
height: 100vh;
padding: 50px 7.5em;
`

const Header = styled.header`
font-size: 3.5rem;
font-weight: bold;
`

const Title = styled.div`
margin-top: 20px;
display: flex;

div {
    padding: 10px 20px;
    color: black;
    background-color: #ecf0f1;
    font-size: 1.3rem;
    text-align: left;
}
div:first-child {
    width: 30%;
}
div:nth-child(n + 2) {
    width: 17.5%;
}
`

export const Home = () => {
    const {isLoading, data} = useQuery<PriceData[]>("allCoins", fetchCoins, {
        refetchInterval: 10000
      })
    return(
        <Container>
            <Helmet><title>Coins</title></Helmet>
            <Header>Coins</Header>
            <Title>
            <div>Name</div>
            <div>Price</div>
            <div>24h Change</div>
            <div>24h Volume</div>
            <div>Markey Cap</div>
            </Title>
            {isLoading ? <Loader actionText='isLoading'/> : (
                <>
                {data?.slice(0, 20).map((coin) => (
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
                </>
            )}
        </Container>
    )
}
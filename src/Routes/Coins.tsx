import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
padding: 30px;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
`

export const Loader = styled.div`
color: #f1c40f;
margin-top: 50px;
font-size: 2rem;
`
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;


export const Header = styled.header`
font-size: 3.5em;
padding-top: 20px;
`

const CoinUl = styled.ul`
width: 30%;
padding-top: 30px;
`

const CoinLi = styled.li`
background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }

export const Coins = () => {
    const [coins, setCoins] = useState<CoinInterface[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins")
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, [])


    return(
        <Container>
            <Helmet><title>Coins</title></Helmet>
            <Header>Coins</Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinUl>
                {coins.map((coin) => (
                    <CoinLi key={coin.id}>
                        <Link to={`/${coin.id}`} state={{name: coin.name}}>
                            <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.name} &rarr;
                        </Link>
                    </CoinLi>
                ))}
            </CoinUl>
            )}
        </Container>
    )
}
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Header, Loader } from './Coins';

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }

interface RouteParams {
    coinId: string;
}

interface nameState{
    name: string;
}
    
interface RouteState{
    state: nameState;
}

const OverView = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  border-radius: 10px;
  margin-top: 30px;
`
const OverviewItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Inhalt = styled.span`
margin-top: 6px;
color: #f1c40f;
`
    
export const Coin = () => {
    const [info, setInfo] = useState<InfoData>()
    const [priceInfo, setPriceInfo] = useState<PriceData>()
    const [loading, setLoading] = useState(true)
    const params = useParams() as unknown as RouteParams;
    const coinId = params.coinId;
    const {state: {name}} = useLocation() as unknown as RouteState;

    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
            setInfo(infoData)
            setPriceInfo(priceData)
            setLoading(false);
        })()
    }, [coinId])
    return(
        <Container>
            <Helmet><title>{name} | Loading...</title></Helmet>
            <Header>
                {name}
            </Header>
            {loading ? (
                <Loader>Loading....</Loader>
            ) : (
                <>
                <OverView>
                    <OverviewItem>
                    <span>Rank</span> 
                    <Inhalt>{info?.rank}</Inhalt>
                    </OverviewItem>
                    <OverviewItem>
                    <span>Symbol</span>
                    <Inhalt>${info?.symbol}</Inhalt>
                    </OverviewItem>
                    <OverviewItem>
                    <span>Open Source</span>
                    <Inhalt>{info?.open_source ? "true" : "false"}</Inhalt>
                    </OverviewItem>
                </OverView>
                {info?.description}
                </>
            )}
        </Container>
    )
}
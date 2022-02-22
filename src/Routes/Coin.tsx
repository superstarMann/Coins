import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, Outlet, Route, Routes, useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { PriceData } from '../interface';
import { Chart } from './Chart';
import { Header, Loader} from '../Components/CoinsList';
import { Price } from './Price';

export interface InfoData {
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

interface RouteParams {
    coinId: string;
}

interface nameState{
    name: string;
}
    
interface RouteState{
    state: nameState;
}

const Wohnung = styled.div`
width: 30%;
margin-top: 10px;
`

const OverView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  border-radius: 10px;
  margin-top: 6px;
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

const CoinInfo = styled.div`
background-color: rgba(0, 0, 0, 0.5);
margin-top: 6px;
line-height: 2em;
color: white;
border-radius: 15px;
padding: 20px;
div{
    color: #74b9ff;
}
`

const Box = styled.div`
margin-top: 2px;
display: flex;
flex-direction: column;
`

const SLink = styled.span<{isActive: boolean}>`
margin-top: 6px;
width: 100%;
background-color: rgba(0, 0, 0, 0.5);
text-align: left;
font-size: 1rem;
padding: 13px 20px;
border-radius: 10px;
`
    
export const Coin = () => {
    const params = useParams() as unknown as RouteParams;
    const coinId = params.coinId;
    const priceMatch = useMatch('/:coinId/price');
    const chartMatch = useMatch('/:coinId/chart')
    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId))
    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {
        refetchInterval: 100000
    })
    const loading = infoLoading || tickersLoading;
    /*const [info, setInfo] = useState<InfoData>()
    const [priceInfo, setPriceInfo] = useState<PriceData>()
    const [loading, setLoading] = useState(true)
    const {state: {name}} = useLocation() as unknown as RouteState;
    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
            setInfo(infoData)
            setPriceInfo(priceData)
            setLoading(false);
        })()
    }, [coinId])*/
    return(
        <>
            <Helmet><title>{loading ? `${infoData?.name} | Loading...` : `${infoData?.name} | Coin`}</title></Helmet>
            <Header>
                {infoData?.name}
            </Header>
            {loading ? (
                <Loader>Loading....</Loader>
            ) : (
                <Wohnung>
                <OverView>
                    <OverviewItem>
                    <span>Rank</span> 
                    <Inhalt>{infoData?.rank}</Inhalt>
                    </OverviewItem>
                    <OverviewItem>
                    <span>Symbol</span>
                    <Inhalt>${infoData?.symbol}</Inhalt>
                    </OverviewItem>
                    <OverviewItem>
                    <span>Price</span>
                    <Inhalt>${tickersData?.quotes.USD.price}</Inhalt>
                    </OverviewItem>
                </OverView>
                <CoinInfo>
                <div>Description</div>
                {infoData?.description}
                </CoinInfo>
                <OverView>
                <OverviewItem>
                    <span>Total Suply</span> 
                    <Inhalt>{tickersData?.total_supply}</Inhalt>
                    </OverviewItem>
                    <OverviewItem>
                    {""}
                    </OverviewItem>
                    <OverviewItem>
                    <span>Max supply</span>
                    <Inhalt>{tickersData?.max_supply}</Inhalt>
                    </OverviewItem>
                </OverView>
                <Box>
                    <SLink isActive={priceMatch !== null}>
                        <Price/>
                    </SLink>
                    <SLink isActive={chartMatch !== null}>
                        <Chart coinId={coinId}/>
                    </SLink>
                <Outlet/>
                </Box>
                </Wohnung>
            )}
        </>
    )
}
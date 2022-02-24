import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { PriceData } from '../interface';
import { Chart } from './Chart';
import { TitleName } from '../Components/TitleName';
import { Container, MM } from './Home';
import { CoinDetail } from '../Components/CoinDetail';
import { CoinInfo } from '../Components/CoinInfo';
import { Loader } from '../Components/Loader';

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


const Box = styled.div`
gap:2rem;
width: 100%;
display: flex;
`

const SLink = styled.span<{isActive: boolean}>`
width: 50%;
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
        <TitleName name={infoData?.name}/>
            <Helmet><title>{loading ? `${infoData?.name} | Loading...` : `${infoData?.name} | Coin`}</title></Helmet>
            <Container>
                <MM>
            {loading ? (
                <Loader actionText='Loading...'/>
            ) : (
                <>
                    <CoinDetail 
                    percent_change_24h={tickersData?.quotes.USD.percent_change_24h}
                    ath_price={tickersData?.quotes.USD.ath_price}
                    symbol={infoData?.symbol} 
                    price={tickersData?.quotes.USD.price}/>
                <Box>
                    <SLink isActive={chartMatch !== null}>
                        <Chart coinId={coinId}/>
                    </SLink>
                    <CoinInfo 
                    max_supply={tickersData?.max_supply}
                    total_supply={tickersData?.total_supply}
                    circulating_supply={tickersData?.circulating_supply}
                    market_cap={tickersData?.quotes.USD.market_cap}
                    rank={infoData?.rank}
                    />
                </Box>
                </>
            )}
            </MM>
            </Container>
        </>
    )
}
import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts'
import { Loader } from '../Components/Loader';
import styled from 'styled-components';
import { MiniTitle } from '../Components/CoinInfo';

const Container = styled.div`
padding-top: 3rem;
width: 80%;
`

const ChartImg = styled.div`
padding-top: 2rem;
`

interface IParams {
   coinId?: string | any;
}
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
  }

export const Chart = ({coinId}: IParams) => {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 100000
    });
    return(
    <Container>
        <MiniTitle><span>Chart</span></MiniTitle>
        {isLoading ? (<Loader actionText='Loading...'/>) : (
            <ChartImg>
            <ApexChart
            type="candlestick"
            options={{
                chart:{
                    type:"candlestick",
                    toolbar: {show: false}
                },
                tooltip:{
                    enabled: true
                },
                xaxis:{
                    type: "datetime",
                    labels: {format: "MM/dd"}
                },
                yaxis:{
                    tooltip: {enabled: true},
                    labels:{
                        formatter: (money) => money.toLocaleString("KR")
                    }
                },
                plotOptions:{
                    candlestick:{
                        colors:{
                            upward: "#ff0000",
                            downward: "#0000ff"
                        }
                    }
                }
            }}
            series={[
                {
                    data: data?.map(coin => ({
                        x: coin.time_open,
                        y: [coin.open, coin.high, coin.low, coin.close]
                    }))
                }
            ]}
            />
        </ChartImg>
        )}
    </Container>
    )
}
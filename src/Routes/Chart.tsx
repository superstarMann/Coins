import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts'
import { Loader } from '../Components/CoinsList';

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
    <div>
        <div>Chart</div>
        {isLoading ? (<Loader>Loading...</Loader>) : (
            <ApexChart
            type="line"
            series={[
                {
                name: "price",
                data: data?.map(coin => coin.low)
            }
            ]}
            options={{
                theme: {
                    mode: "light"
                },
                grid: {
                    show: false
                },
                yaxis: {
                    show: false
                },
                xaxis:{
                    labels:{
                        show: false
                    },
                    axisTicks:{
                        show:false
                    },
                    axisBorder: {
                        show: false                        
                    },
                    type: "datetime",
                    categories: data?.map((price) => price.time_close),
                },
                stroke: {
                    curve: "smooth",
                    width: 4,
                  },
                chart: {
                    width: 700,
                    height: 500,
                    toolbar: {
                        show: false
                    },
                    background: "transparent"
                },tooltip: {
                    y: {
                      formatter: (value) => `$${value.toFixed(2)}`,
                    },
                  },
            }}
            />
        )}
    </div>
    )
}
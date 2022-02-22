
export const fetchCoins = async () => {
    const response = await fetch("https://api.coinpaprika.com/v1/tickers")
    const json = await response.json();
    return json;
}

export const fetchCoinInfo = async (coinId: string) => {
    const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
    return infoData;
}

export const fetchCoinTickers = async (coinId: any) => {
    const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
    return priceData;
}

export const fetchCoinHistory = async(coinId: string) => {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 *60 *24 *30;
    const historyfetch = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
    return historyfetch;
}
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Loader = styled.div`
color: #f1c40f;
margin-top: 50px;
font-size: 2rem;
`

export const Header = styled.header`
font-size: 3.5em;
padding-top: 20px;
`

const CoinUl = styled.ul`
`

const CoinLi = styled.li`
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    opacity: 0.5;
    transition: color 0.2s ease-in;
  }
`
const Slink = styled(Link)`
border-bottom: 1px solid black;
display: flex;
span {
    color: black;
    font-size: 1.3rem;
    text-align: left;
    img{
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
}
span:first-child {
  width: 30%;
  display: flex;
  align-items: center;
}
span:nth-child(n + 2) {
    width: 17.5%;
    padding-left: 10px;
}
`

interface IProps {
  name: string;
  id: string;
  percent_change_24h: string | number;
  price: string | number;
  volume_24h: number;
  market_cap: number;
  symbol: string;
}

export const CoinsList:React.FC<IProps> = ({id, percent_change_24h, price, volume_24h, market_cap, symbol, name}) => {
    /*const [coins, setCoins] = useState<CoinInterface[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins")
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, [])*/
    return(
      <CoinUl>
        <CoinLi key={id}>
            <Slink to={`/${id}`} state={{name: name}}>
            <span><img src={`https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`}/>
                {name}</span>
                <span>${price}</span>
                <span>{percent_change_24h >= 0  ?  
                <div style={{color: "red"}}>+{percent_change_24h}%</div> : 
                <div style={{color: "blue"}}>{percent_change_24h}%</div>}
                </span>
                <span>{volume_24h}</span>
                <span>{market_cap}</span>
            </Slink>
        </CoinLi>
      </CoinUl>
    )
}
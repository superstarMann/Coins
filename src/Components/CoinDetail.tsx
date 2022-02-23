import React, { useState } from 'react';
import styled from 'styled-components';

const CoinUl = styled.div`
border-radius: 10px;
display: flex;
background-color: rgba(247, 241, 227,1.0);
color: black;
justify-content: space-around;
align-items: center;
font-size: 1.5rem;
font-weight: 600;
div:first-child{
    margin-top: 15px;
}

div:nth-child(n + 2){
    padding-top: 10px;
    span{
        opacity: 0.5;
        font-size: 1rem;
    }
}
padding-top: 10px;
padding-bottom: 20px;
`

const PrecentNum = styled.div`
`

interface IProps {
symbol?: string;
price?: number;
percent_change_24h: any;
ath_price?: number;
}

export const CoinDetail:React.FC<IProps> = ({symbol, price, percent_change_24h, ath_price}) => {

    return(
        <CoinUl>
            <div>{symbol}/USDT</div>
            <div>
                <span>Price</span>
                <div>${price?.toFixed(4)}</div>
            </div>
            <div>
                <span>24 Change</span>
                {percent_change_24h >= 0 ? (
                    <PrecentNum style={{color: "red"}}>
                        {`${percent_change_24h}%`}
                    </PrecentNum>
                ) : (
                    <PrecentNum style={{color: "blue"}}>
                        {`${percent_change_24h}%`}
                    </PrecentNum>
                )}
            </div>
            <div>
                <span>ATH</span>
                <div>{ath_price?.toFixed(4)}</div>
            </div>
        </CoinUl>
    )
}
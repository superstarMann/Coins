import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Chart } from './Routes/Chart';
import { Coin } from './Routes/Coin';
import { Home } from './Routes/Home';
import { Price } from './Routes/Price';

export const Router = () => {
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/:coinId/*" element={<Coin />} >
                <Route path="chart" element={<Chart />} />
                <Route path="price" element={<Price />} />
              </Route>
          </Routes>
        </BrowserRouter>
    )    
}
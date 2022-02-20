import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Coin } from './Routes/Coin';
import { Coins } from './Routes/Coins';

export const Router = () => {
    return(
        <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Coins/>}/>
              <Route path={'/:coinId'} element={<Coin/>}/>
          </Routes>
        </BrowserRouter>
    )    
}
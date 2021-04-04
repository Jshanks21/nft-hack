import React from 'react';
import { useCurveCalls } from '../hooks/useCurveCalls.js';
import Account from './Account.js';

export default function Header() {
  const totalSupply = useCurveCalls('totalSupply')

  return (
    <div>
      <nav className="bg-white">
        <div className="flex flex-row justify-between">
          <h1 className="flex font-display text-6xl uppercase">DynamicRare</h1>
          <div className="flex justify-around">
            <Account />   
            <div className="ml-4 border-2  border-black hover:bg-black hover:text-white px-4 flex my-auto">NFTs Purchased: {totalSupply ? totalSupply.toString() : []}</div>
          </div>
        </div>
      </nav>
    </div>
  )
}
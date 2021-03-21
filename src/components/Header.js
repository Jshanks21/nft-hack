import React, { useState, useEffect, useCallback } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { NETWORK, NETWORKS } from '../constants.js';
import Account from "./Account";


const { INFURA_ID } = require('../secrets.json');

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

export default function Header({ injectedProvider, setInjectedProvider, setTrigger, trigger }) {
  // const [injectedProvider, setInjectedProvider] = useState();
  const [userAccount, setUserAccount] = useState();

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));
      
    if(!injectedProvider) return

    let account = await injectedProvider.listAccounts()
    localStorage.setItem('account', account)
    setUserAccount(account)
    console.log('accounts', account)
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    setTrigger(trigger++)
  }, [loadWeb3Modal]);

  useEffect(() => {
    console.log('header prov', injectedProvider)
  }, [injectedProvider])

  return (
    <div>
      <nav className="bg-white w-full">
        <div className="flex flex-row justify-between">
          <h1 className="flex font-display text-6xl uppercase">DynamicRare</h1>
          <div className="flex justify-between space-x-4 right-0">
          <Account
           web3Modal={web3Modal}
           loadWeb3Modal={loadWeb3Modal}
           logoutOfWeb3Modal={logoutOfWeb3Modal}
         />
            <button className="flex font-display bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Number Redeemed</button>
            <button className="font-display bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex">Buy</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

window.ethereum && window.ethereum.on('chainChanged', chainId => {
  setTimeout(() => {
    window.location.reload();
  }, 1);
})



import React, { useState, useEffect, useCallback } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { NETWORK, NETWORKS } from '../constants.js';
import Account from "./Account";


const { INFURA_KEY } = require('../secrets.json');

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_KEY,
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

export default function Header({ injectedProvider, setInjectedProvider, setTrigger, trigger, contract }) {
  // const [injectedProvider, setInjectedProvider] = useState();
  const [userAccount, setUserAccount] = useState();
  const [nftSupply, setNFTSupply] = useState();

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));
      
    if(!injectedProvider) return

    let account = await injectedProvider.listAccounts()
    localStorage.setItem('account', account)
    setUserAccount(account)
    //console.log('accounts', account)
  }, [setInjectedProvider]);

  // useEffect(async () => {
  //   if (!contract) return
  //   const initContract = await contract
	// 	const supply = await initContract.totalSupply()
  //   setNFTSupply(supply.toString())
  // })

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    setTrigger(trigger++)
  }, [loadWeb3Modal]);


  return (
    <div>
      <nav className="bg-white">
        <div className="flex flex-row justify-between">
          <h1 className="flex font-display text-6xl uppercase">DynamicRare</h1>
          <div className="flex justify-around">
          <Account
           web3Modal={web3Modal}
           loadWeb3Modal={loadWeb3Modal}
           logoutOfWeb3Modal={logoutOfWeb3Modal}
         />
            <div className="ml-4 border-2  border-black hover:bg-black hover:text-white px-4 flex my-auto">NFTs Purchased: {nftSupply ? nftSupply : null}</div>
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



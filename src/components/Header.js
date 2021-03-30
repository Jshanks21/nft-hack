import React, { useState, useEffect } from 'react';
import Account from "./Account";

export default function Header({ account, web3Modal, contract, connect, disconnect }) {
  const [nftSupply, setNFTSupply] = useState();

  useEffect(async () => {
    if (!contract) return
    const initContract = await contract
    const supply = await initContract.totalSupply()
    setNFTSupply(supply.toString())
  }, [contract])

  return (
    <div>
      <nav className="bg-white">
        <div className="flex flex-row justify-between">
          <h1 className="flex font-display text-6xl uppercase">DynamicRare</h1>
          <div className="flex justify-around">
            <Account
              account={account}
              web3Modal={web3Modal}
              connect={connect}
              disconnect={disconnect}
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



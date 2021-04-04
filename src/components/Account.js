import React from "react";
import { useEthers, useEtherBalance, shortenIfAddress } from '@usedapp/core';
import { ethers } from 'ethers';

export default function Account() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
	const userBalance = useEtherBalance(account)
  const formattedAddr = shortenIfAddress(account)

  return (
    <>
    {account && <p className="my-auto mr-3" ><b>Account:</b> {formattedAddr}</p>}
    {userBalance && <p className="my-auto mr-3"><b>Ether balance:</b> {ethers.utils.formatEther(userBalance)} ETH </p>}

    {!account && <button onClick={activateBrowserWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 my-auto py-2 px-4 rounded">Connect</button>}
    {account && <button onClick={deactivate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 my-auto py-2 px-4 rounded"> Disconnect </button>}
    </>
  );
}
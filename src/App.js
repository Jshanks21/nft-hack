import React, { useState, useEffect } from 'react';
import './App.css'
import NFTCard from './components/NFTCard'
import Header from './components/Header'
import BuySell from './components/BuySell'
import IpfsUpload from './components/IpfsUpload'
import curve from './abi/curve'
import curveMint from './abi/curveMint'
import minter from './abi/minter'
import { ethers } from 'ethers'
import { local } from 'web3modal';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {
  const [ipfsHash, setIpfsHash] = useState([])
  const [state, setState] = useState({
		tokenHash: [],
		buffer: null,
	});

  const [loading, setLoading] = useState(false);

	function captureFile(e) {
		e.preventDefault()
		const file = e.target.files[0]
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => {
			setState(x => ({ ...x, buffer: Buffer(reader.result) }))
			console.log(state)
		}
	}

  const onSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		const source = await ipfs.add(
			state.buffer
		)
		if (source && source.path) {
      setIpfsHash(x => [...x, source.path])
		}
		setLoading(false)
		console.log('source', source)
	}

  const loadContract = () => {
    const provider = localStorage.getItem('provider')
    return new ethers.Contract(
        CONTRACT_ADDRESS_RINKEBY, // replace with constant
        curveMint,
        provider.getSigner()
    );
};

	// Could be useful somewhere else to get last NFT minted

	//   const getLastId = async () => {
	//     const nfts = await state.contract.totalSupply()
	//     const lastNft = await state.contract.tokenByIndex(nfts - 1)
	//     console.log(lastNft.toString())
	//     return lastNft
	//   } 

  return (
    <div className="p-5">
        <Header></Header>
        <NFTCard imageSource={ipfsHash}></NFTCard>
        <IpfsUpload state={state} setState={setState} loading={loading} setLoading={setLoading} onSubmit={onSubmit} captureFile={captureFile}></IpfsUpload>        
    </div>
  );
}

export default App;
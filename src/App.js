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
import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const CONTRACT_MUMBAI = '0x5BE326ba3D539a6C5387775465F6D24B798b3c49'
const CONTRACT_RINKEBY = '0x01a9FBe75907846b4334454f0A3cEeaE322DcD74'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const { INFURA_KEY, WALLET_PRIV } = require('./secrets.json');

// const web3Modal = new Web3Modal({
//   // network: "mainnet", // optional
//   cacheProvider: true, // optional
//   providerOptions: {
//     walletconnect: {
//       package: WalletConnectProvider, // required
//       options: {
//         infuraId: INFURA_KEY,
//       },
//     },
//   },
// });

function App() {
	const [injectedProvider, setInjectedProvider] = useState();
	const [ipfsHash, setIpfsHash] = useState([])
	const [state, setState] = useState({
		tokenHash: [],
		buffer: null,
	});
	const [contract, setContract] = useState();
	const [loading, setLoading] = useState(false);
	const [trigger, setTrigger] = useState(0);

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

	let provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');

	//let signer = ethers.Wallet.fromMnemonic(MNEMONIC)
	let signer = new ethers.Wallet(WALLET_PRIV, provider);

	const loadContract = async () => {
		//const provider = await web3Modal.connect();
    //const injectedProv = new ethers.providers.Web3Provider(provider);
		return new ethers.Contract(
			CONTRACT_MUMBAI,
			curveMint,
			signer
		);
	};

	useEffect(() => {
		if(!injectedProvider) return
		console.log('prov', injectedProvider)
		const newContract = loadContract()
		setContract(newContract)
	}, [ipfsHash, trigger, injectedProvider])

	// Could be useful somewhere else to get last NFT minted

	//   const getLastId = async () => {
	//     const nfts = await state.contract.totalSupply()
	//     const lastNft = await state.contract.tokenByIndex(nfts - 1)
	//     console.log(lastNft.toString())
	//     return lastNft
	//   } 

	return (
		<div className="p-5">
			<Header 
				injectedProvider={injectedProvider} 
				setInjectedProvider={setInjectedProvider} 
				setTrigger={setTrigger} 
				trigger={trigger}
			>
			</Header>
			<NFTCard imageSource={ipfsHash} contract={contract}></NFTCard>
			<IpfsUpload
				state={state}
				setState={setState}
				loading={loading}
				setLoading={setLoading}
				onSubmit={onSubmit}
				captureFile={captureFile}
				ipfsHash={ipfsHash}
				injectedProvider={injectedProvider} 
				contract={contract}
			>
			</IpfsUpload>
			<Switch>
			<Route path='/dashboard' component={MetaData} />
			</Switch>
		</div>
	);
}

export default App;

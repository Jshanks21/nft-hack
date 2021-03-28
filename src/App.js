import React, { useState, useEffect } from 'react';
import './App.css'
import { getChain } from 'evm-chains';
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
import MetaData from './components/MetaData'

const CONTRACT_MUMBAI = '0x5BE326ba3D539a6C5387775465F6D24B798b3c49'
const CONTRACT_RINKEBY = '0x01a9FBe75907846b4334454f0A3cEeaE322DcD74'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const { WALLET_PRIV, INFURA_KEY } = require('./secrets.json');

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: INFURA_KEY,
		}
	}
};

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

	const [web3Modal, setWeb3Modal] = useState();
	const [userState, setUserState] = useState({
		account: null,
		balance: null,
		network: null,
		provider: null,
		signer: null,
		web3Provider: null,
		jsonProvider: null
	});

	useEffect(async () => {
		await init()
	}, [])

	const init = async () => {
		const web3Modal = new Web3Modal({
			// network: "mainnet", // optional
			cacheProvider: true, // optional
			providerOptions, // required
			disableInjectedProvider: false, // Declare MetaMask
		});
		setWeb3Modal(web3Modal);


	// 	//Settings for only MetaMask
	// 	if (typeof window.ethereum !== 'undefined') {
	// 		let network, balance, provider, signer

	// 		window.ethereum.autoRefreshOnNetworkChange = false;
	// 		provider = new ethers.providers.Web3Provider(window.ethereum);
	// 		signer = provider.getSigner();

	// 		setUserState(x => ({ ...x, provider: provider, signer: signer }))

			//Update address&account when MM user change account

			// window.ethereum.on('accountsChanged', async (accounts) => {
			//   if(typeof accounts[0] === 'undefined'){
			//     setUserState({ account: null, balance: null, provider: null})
			//   } else if(userState.provider === null){
			//     setUserState({account: null, balance: null, loading: true})
			//     balance = await web3.eth.getBalance(accounts[0])
			//     setUserState({account: accounts[0], balance: balance, loading: false })
			//   }
			// });

			// window.ethereum.on('chainChanged', async (chainId) => {
			//   this.setState({network: null, balance: null, loading: true, onlyNetwork: true})

			//   if(this.state.account){
			//     balance = await web3.eth.getBalance(this.state.account)
			//     this.setState({balance: balance})
			//   }

			//   network = await getChain(parseInt(chainId, 16))
			//   this.setState({ network: network.network, loading: false, onlyNetwork: false})
			// });
		//}
	}

	useEffect(async() => {
		if (userState.provider) {
			userState.provider.on("accountsChanged", async (accounts) => {
				let account, balance, network, jsonProvider

					if (userState.web3Provider && userState.provider.isMetaMask && userState.provider.selectedAddress !== null) {
						balance = await userState.web3Provider.getBalance(accounts[0])
						setUserState(x => ({
							...x, 						
							account: accounts[0],
							balance: ethers.utils.formatEther(balance),					
						}))
					} else if (userState.jsonProvider && userState.provider.wc) {
						console.log('userState.provider test this more', userState.provider)
					}			
			})

			userState.provider.on("chainChanged", async (chainId) => {
				// Finish this
			})
		}
	}, [userState.account, web3Modal])


	const connect = async (e) => {
		e.preventDefault();

		// Restore provider session
		await web3Modal.clearCachedProvider();
		let provider, signer, web3Provider, jsonProvider, account, network, balance

		try {
			provider = await web3Modal.connect()

			if (provider.isMetaMask) { // When MetaMask was chosen as a provider
				account = provider.selectedAddress
				network = await getChain(parseInt(provider.chainId, 16))
				web3Provider = new ethers.providers.Web3Provider(provider)
				signer = web3Provider.getSigner()
				balance = await web3Provider.getBalance(provider.selectedAddress)
			} else if (provider.wc) { // When WalletConect was chosen as a provider
				if (provider.accounts[0] !== 'undefined') {
					account = await provider.accounts[0]
					network = await getChain(provider.chainId)
					jsonProvider = new ethers.providers.JsonRpcProvider(`https://${network.network}.infura.io/v3/${INFURA_KEY}`)
					signer = jsonProvider.getSigner()
					balance = await jsonProvider.getBalance(account)
				} else { //handle problem with providing data
					account = null
					network = null
					balance = null
					jsonProvider = new ethers.providers.JsonRpcProvider(`https://${network}.infura.io/v3/${INFURA_KEY}`)
				}
			} else {
				window.alert('Error, provider not recognized')
			}

			//console.log('user connection details', provider, signer, web3Provider, jsonProvider, account, network, ethers.utils.formatEther(balance))

			setUserState({
				account: account,
				balance: ethers.utils.formatEther(balance),
				network: network.name,
				provider: provider,
				signer: signer,
				web3Provider: web3Provider,
				jsonProvider: jsonProvider
			})

		} catch (e) {
			console.log('Error connecting wallet', e)
			return
		}
	}

	console.log('userState', userState)

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

	//let provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');

	//let signer = ethers.Wallet.fromMnemonic(MNEMONIC)
	//let signer = new ethers.Wallet(WALLET_PRIV, provider);

	const loadContract = async () => {
		return new ethers.Contract(
			CONTRACT_MUMBAI,
			curveMint,
			userState.signer
		);
	};

	useEffect(() => {
		if (!userState.signer) return
		const newContract = loadContract()
		setContract(newContract)
	}, [userState.signer])

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
				contract={contract}

			>
			</Header>
			{/* <NFTCard
				imageSource={ipfsHash}
				contract={contract}
				loading={loading}
				setLoading={setLoading}>
			</NFTCard> */}
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
			<button onClick={connect} className="font-display border-2 uppercase border-black hover:bg-black hover:text-white py-2 px-4 flex">Test Connect</button>
			{userState.account ? userState.account : 'wtf...'}
			<Switch>
				<Route path='/dashboard' component={MetaData} />
			</Switch>
		</div>
	);
}

export default App;

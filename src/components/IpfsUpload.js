import React, { useState, useEffect } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export default function IpfsUpload() {
	const [state, setState] = useState({
		ipfsHash: [],
		tokenHash: [],
		buffer: null,
	});
	const [loading, setLoading] = useState(false);

	const captureFile = (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => {
			setState(x => ({ ...x, buffer: Buffer(reader.result) }))
			console.log(state)
		}
	}

	console.log('state', state)

	const onSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		const source = await ipfs.add(
			state.buffer
		)
		if (source && source.path) {
			setState(x => ({
				...x,
				ipfsHash: source.path,
			}))
		}
		setLoading(false)
		console.log('source', source)
	}

	// Could be useful somewhere else to get last NFT minted

	//   const getLastId = async () => {
	//     const nfts = await this.state.contract.methods.totalSupply().call()
	//     const lastNft = await this.state.contract.methods.tokenByIndex(nfts - 1).call()
	//     console.log(lastNft.toString())
	//     return lastNft
	//   } 



	return (
		<form onSubmit={onSubmit}>
			<input type="file" onChange={captureFile}></input>
			<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload to IPFS</button>
			<div>
			{state.ipfsHash ? state.ipfsHash : null}
			</div>
		</form>
	)
}
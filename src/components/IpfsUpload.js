import React, { useState, useEffect } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export default function IpfsUpload({state, setState, loading, onSubmit, captureFile}) {
	// const [state, setState] = useState({
	// 	ipfsHash: [],
	// 	tokenHash: [],
	// 	buffer: null,
	// });
	// const [loading, setLoading] = useState(false);

	// const captureFile = (e) => {
	// 	e.preventDefault()
	// 	const file = e.target.files[0]
	// 	const reader = new window.FileReader()
	// 	reader.readAsArrayBuffer(file)
	// 	reader.onloadend = () => {
	// 		setState(x => ({ ...x, buffer: Buffer(reader.result) }))
	// 		console.log(state)
	// 	}
	// }

	console.log('state', state)

	// const onSubmit = async (e) => {
	// 	e.preventDefault()
	// 	setLoading(true)
	// 	const source = await ipfs.add(
	// 		state.buffer
	// 	)
	// 	if (source && source.path) {
	// 		setState(x => ({
	// 			...x,
	// 			ipfsHash: source.path,
	// 		}))
	// 	}
	// 	setLoading(false)
	// 	console.log('source', source)
	// }

	// Could be useful somewhere else to get last NFT minted

	//   const getLastId = async () => {
	//     const nfts = await state.contract.totalSupply()
	//     const lastNft = await state.contract.tokenByIndex(nfts - 1)
	//     console.log(lastNft.toString())
	//     return lastNft
	//   } 



	return (
		<>
			<form onSubmit={e => onSubmit(e)} className="flex justify-center my-10 mx-auto">
				<input type="file" onChange={e => captureFile(e)}></input>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload to IPFS</button>
				{loading ? 'Uploading...' : null}
			</form>

			<div className="flex flex-row justify-around mt-10">
				<button className="font-display border-2 uppercase border-black hover:bg-black hover:text-white py-2 px-4 flex">Buy</button>
				<button disabled className="disabled:opacity-50 font-display border-2 border-black uppercase hover:bg-black hover:text-white py-2 px-4 flex">Sell</button>
			</div>
		</>
	)
}
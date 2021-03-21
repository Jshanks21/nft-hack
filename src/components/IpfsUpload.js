import React, { useState, useEffect } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export default function IpfsUpload({state, setState, loading, onSubmit, captureFile, ipfsHash, contract}) {

	const onPurchase = async () => {
		if (!contract && !ipfsHash) return
		try {
		const buy = await contract.buy(ipfsHash)
		console.log('buy', buy)
		} catch(e) {
			console.log('error', e)
		}
	}

	return (
		<>
			<form onSubmit={e => onSubmit(e)} className="flex justify-center my-10 mx-auto">
				<input type="file" onChange={e => captureFile(e)}></input>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload to IPFS</button>
				{loading ? 'Uploading...' : null}
			</form>

			<div className="flex flex-row justify-around mt-10">
				<button 
					className="font-display border-2 uppercase border-black hover:bg-black hover:text-white py-2 px-4 flex"
					onClick={() => onPurchase()}	
				>
						Buy
				</button>
				<button disabled className="disabled:opacity-50 font-display border-2 border-black uppercase hover:bg-black hover:text-white py-2 px-4 flex">Sell</button>
			</div>
		</>
	)
}
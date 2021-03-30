import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'

export default function BuySell({ setLoading, loading, onSubmit, captureFile, ipfsHash, provider, contract }) {
	const [ids, setIds] = useState([])

	useEffect(() => {
		console.log('ipfsupload provider', provider)
	}, [])
	
	useEffect(async () => {
		if(!contract && !ipfsHash) return

		let tokenIds =[]
		ipfsHash.map(async(hash) => {
			const initContract = await contract
			const id = await initContract.uriToTokenId(hash)
			tokenIds.push(id.toString())
		})
		setIds(tokenIds)
	}, [contract, ipfsHash])

	//console.log('state Ids', ids)

	const onPurchase = async () => {
		if (!contract && !ipfsHash) return
		try {
			setLoading(true)
			const initContract = await contract
			const price = await initContract.nextPrice()

			const buy = await initContract.buy(ipfsHash.toString(), { value: price })
			await buy.wait()

			setLoading(false)
			console.log('contract tests', price.toString())
			console.log('buy', buy)

		} catch (e) {
			console.log('error', e)
		}
	}

	const onSale = async () => {
		if (!contract) return
		try {
			setLoading(true)
			const initContract = await contract
			const id = await initContract.uriToTokenId(ipfsHash.toString())

			const sell = await initContract.sell(id)
			await sell.wait()

			setLoading(false)
			console.log('contract tests', id)
			console.log('sell', sell)

		} catch (e) {
			console.log('error', e)
		}
	}

	return (
		<>
			<form onSubmit={e => onSubmit(e)} className="flex justify-center my-10 mx-auto">
				<input type="file" onChange={e => captureFile(e)}></input>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload to IPFS</button>
				
			</form>

			<div className="flex justify-around mt-10">
				<button
					className="font-display border-2 uppercase border-black hover:bg-black hover:text-white py-2 px-4 flex"
					onClick={() => onPurchase()}
				>
					{!loading ? 'Buy' : <p className="animate-ping">Loading...</p>}
				</button>

				<select>
					{ipfsHash.map(hash => {
						return (
							<option>NFT ID: </option>
						)
					})}
				
				</select>

				<button 
					className="font-display border-2 border-black uppercase hover:bg-black hover:text-white py-2 px-4 flex"
					onClick={() => onSale()}
				>
					{!loading ? 'Sell' : <p className="animate-ping">Loading...</p>}
				</button>
			</div>
		</>
	)
}
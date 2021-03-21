import React, { useState, useEffect } from 'react';
import AnimatedCard from "@sl-codeblaster/react-3d-animated-card";
import { ethers } from 'ethers'

const CONTRACT_MUMBAI = '0x5BE326ba3D539a6C5387775465F6D24B798b3c49'

export default function NFTCard({ imageSource, contract }) {
	const [cName, setCName] = useState('')
	const [contractData, setContractData] = useState({
		lastPrice: '',
		currPrice: '', 
		nextPrice: ''
	});

	let imageDisplay

	if(imageSource.length > 0) {
		imageDisplay = imageSource.map(hash => {
			return (
				<div className="" key={hash}>
					<img 
						className="shadow-2xl w-2/5 m-10" 
						src={`https://ipfs.io/ipfs/${hash}`} 
						alt="" 
					/>
				</div>
			)
		})
	}

	useEffect(async () => {
		if (!contract) return
		const initContract = await contract;
		const prevPrice = await initContract.prevPrice()
		const currentPrice = await initContract.currentPrice()
		const nextPrice = await initContract.nextPrice()

		setContractData({
			lastPrice: ethers.utils.formatUnits(prevPrice),
			currPrice: ethers.utils.formatUnits(currentPrice),
			nextPrice: ethers.utils.formatUnits(nextPrice)
		})

		const name = await initContract.name()
		setCName(name)

		console.log('prices', ethers.utils.formatUnits(prevPrice), currentPrice.toString(), nextPrice.toString())
	}, [contract])

		
	// if(imageSource) {
	// 	imageDisplay = imageSource.map((imgHash) => {
	// 		return (
	// 		<div>
	// 		<AnimatedCard
	// 		config={{
	// 			rotation: 40, // this value for the divide (window.innerWidth / 2 - e.pageX) / rotation && (window.innerWidth / 2 - e.pageY) / rotation
	// 			transition: {
	// 				duration: 0.25,
	// 				timingMode: "ease"
	// 			},
	// 			transform: {
	// 				figureIcon: {
	// 					rotation: 5,
	// 					translateZ: 100
	// 				},
	// 				titleTranslateZ: 140,
	// 				bodyTextTranslateZ: 100,
	// 				buttonTranslateZ: 80
	// 			}
	// 		}}
	// 		style={{
	// 			width: 350 //container style (you can use className as well)
	// 		}}
	// 	>
	
	// 		<div className="card">
	// 			<div className="figure">
	// 				<div className="figure_bg" />
	// 				<img 
	// 					className="shadow-2xl" //`https://ipfs.io/ipfs/${state.ipfsHash}`
	// 					src={`https://ipfs.io/ipfs/${imgHash}`} 
	// 					alt="" 
	// 				/>
	// 			</div>
	// 		</div>
	
	// 	</AnimatedCard>
	// 	</div>)
	// 	})
	// }

	return (
		<div>
			<div className="flex items-center">

				{imageDisplay}
		
			</div>

			<div className="container mx-auto">
				<h1>{cName ? cName : 'loading...'}</h1>
				<h2>Live on Mumbai Testnet: 
					<a 
						target="_blank" 
						href={`https://explorer-mumbai.maticvigil.com/address/${CONTRACT_MUMBAI}/transactions`}
						className="text-blue-400"
					>
						{CONTRACT_MUMBAI}
					</a>
				</h2>
				<p>Last Price of NFT: {contractData.lastPrice ? contractData.lastPrice : 'loading...'}</p>
				<p>Price of <b>your</b> NFT: {contractData.currPrice ? contractData.currPrice : 'loading...'}</p>
				<p>Price of next NFT: {contractData.nextPrice ? contractData.nextPrice : 'loading...'}</p>
				<p>Amount of NFT available</p>
			</div>
		</div>
		)
}



import React, { useState, useEffect } from 'react';
import AnimatedCard from "@sl-codeblaster/react-3d-animated-card";

export default function NFTCard({ imageSource }) {

	useEffect(() => {
		console.log('imageSource', typeof imageSource)
		console.log('imageSource 2 ', imageSource)
	}, [imageSource])

	let imageDisplay

	if(imageSource.length > 0) {
		imageDisplay = imageSource.map(hash => {
			return (
				<div className="">
					<img 
						className="shadow-2xl w-2/5 m-10" 
						src={`https://ipfs.io/ipfs/${hash}`} 
						alt="" 
					/>
				</div>
			)
		})
	}
		
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
				<h1>Title of NFT</h1>
				<h2>Symbol of NFT</h2>
				<p>Price of NFT</p>
				<p>Amount of NFT available</p>
			</div>
		</div>
		)
}



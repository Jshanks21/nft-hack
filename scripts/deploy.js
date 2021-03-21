const { ethers } = require("hardhat");

const MUMBAI_CONTRACT = ''
const RINKEBY_CONTRACT = ''

async function main() {
	//const [deployer, creator, minter] = await ethers.getSigners()

	const NFTMinter = await ethers.getContractFactory("NFTMinter")
	const minterContract = await NFTMinter.deploy()
	console.log("NFTMinter deployed to:", minterContract.address)

	const CurveNFT = await ethers.getContractFactory("CurveNFT")
	const curveContract = await CurveNFT.deploy(minterContract.address)
	console.log("CurveNFT deployed to:", curveContract.address)

	// Instantiate and transfer ownership to curve
	const nft = await NFTMinter.attach(minterContract.address)
	//await nft.transferOwnership(cContract.address) For if curve is minting nfts

	nft.setApprovalForAll(curveContract.address, true)

	// Instantiate and mint tokens to curve
	// curve = await CurveNFT.attach(cContract.address)
	await nft.mintItem(curveContract.address, 'example')
	await nft.mintItem(curveContract.address, 'test')
	await nft.mintItem(curveContract.address, 'victory')
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
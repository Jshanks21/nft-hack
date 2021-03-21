const { ethers } = require("hardhat");

const MUMBAI_CONTRACT = ''
const RINKEBY_CONTRACT = ''

async function main() {
	//const [deployer, creator, minter] = await ethers.getSigners()

	const NFTMinter = await ethers.getContractFactory("NFTMinter")
	const minterContract = await NFTMinter.deploy()
	console.log("NFTMinter deployed to:", minterContract.address)

	const CurveMintNFT = await ethers.getContractFactory("CurveMintNFT")
	const curveMintContract = await CurveMintNFT.deploy()
	console.log("CurveMintNFT deployed to:", curveMintContract.address)

	// Instantiate and transfer ownership to curve
	const nft = await NFTMinter.attach(minterContract.address)
	await nft.transferOwnership(curveMintContract.address)

}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
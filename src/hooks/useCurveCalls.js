import { useContractCall } from '@usedapp/core';
import curveMint from '../abi/curveMint.json';
import { ethers } from 'ethers';

export function useCurveCalls(method) {
	const curveInterface = new ethers.utils.Interface(curveMint)

	return useContractCall(
		method
			? ({
				abi: curveInterface,
				address: process.env.REACT_APP_CONTRACT_RINKEBY,
				method: method,
				args: [],
			})
			: []
	)
}
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'

function MetaData() {
    const url = 'https://api.covalenthq.com/v1/1/tokens/0xb80fbf6cdb49c33dc6ae4ca11af8ac47b0b4c0f3/nft_metadata/432/?key=ckey_693c563ac29c41bcbccfbe9326d';
    const [contract, setContract] = useState(null);

    let content = null

    useEffect(() => {
        axios.get(url) 
        .then(response => {
            setContract(response.data)
        })
    }, [url])

    if(contract) {
        content = <div className="mt-4 ml-4">
            <div>
            <h1 className="text-2xl font-extrabold tracking-wider">About Your Artwork</h1>
            <img className="mt-2 mb-2 h-44 w-44" src={contract.data.items[0].nft_data[0].external_data.image}></img>
            <p className="text-lg font-sans font-medium"><span className="font-bold">Contract address: </span>
            {contract.data.items[0].contract_address}</p>
            <p className="text-lg font-sans font-medium"><span className="font-bold">Contract name:</span>{contract.data.items[0].contract_name}</p>
            <p className="text-lg font-sans font-medium"><span className="font-bold">Description:</span>{contract.data.items[0].nft_data[0].external_data.description}</p>
            </div>

            <div>
                <h2 className='font-bold text-xl pt-6 pb-2 tracking-normal'>Who to Connect With</h2>
                <div className="flex flex-row align-middle mb-4">
            <p className="text-lg font-sans font-medium"><span className="font-bold">Owner: </span>{contract.data.items[0].nft_data[0].external_data.owner}</p>
            <a href={`https://opensea.io/accounts/${contract.data.items[0].nft_data[0].external_data.owner}`}>
            <button className="bg-blue-500 rounded py-2 px-4 text-white flex ml-4">Connect with @{contract.data.items[0].nft_data[0].external_data.owner} OpenSea</button>
            </a>
            </div>
            <div className="flex flex-row align-middle">
            <p className="text-lg font-sans font-medium flex py-2"><span className="font-bold">Style Creator: </span>{contract.data.items[0].nft_data[0].external_data.attributes[0].value}</p>
            <a href={`https://twitter.com/${contract.data.items[0].nft_data[0].external_data.attributes[0].value}`}>
            <button className="bg-blue-500 rounded py-2 px-4 text-white flex ml-4">Connect with @{contract.data.items[0].nft_data[0].external_data.attributes[0].value} on Twitter</button></a>
            </div>
            </div>
        </div>
    }

    console.log(contract)

    return (
        <div>
           {content}
        </div>
    )
  }

  export default MetaData
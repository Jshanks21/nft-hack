import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'

function DataFetching() {
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
        content = <div></div>
    }

    console.log(contract)

    return (
        <div>
        <h1 className="text-2xl">Contract Metadata</h1>
        <p className="text-lg font-sans font-medium">Contract address: {contract.data.items[0].contract_address}</p>
        <p className="text-lg font-sans font-medium">Contract address: {contract.data.items[0].contract_name}</p>
        <p className="text-lg font-sans font-medium">Contract address: {contract.data.items[0].contract_name}</p>
        </div>
    )
  }

  export default DataFetching
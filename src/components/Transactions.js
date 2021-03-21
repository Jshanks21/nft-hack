import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Transactions() {
    const url = 'https://api.covalenthq.com/v1/1/address/0xb80fbf6cdb49c33dc6ae4ca11af8ac47b0b4c0f3/transactions_v2/?&key=ckey_693c563ac29c41bcbccfbe9326d';
    const [contract, setContract] = useState([]);

    let content = null

    useEffect(() => {
        axios.get(url) 
        .then(response => {
            setContract(response.data)
        })
    }, [url])

    if(contract) {
        content = <div>
            {
                contract.length ?
                contract.map(contracts => (
                    <div> {contracts.data.items.block_signed_at}
                    </div>
                ))
                :
                <h1>Loading Data...</h1>
            }
        </div>
    }

    console.log('Transaction Data', contract)

    return (
        <div>
           {content}
        </div>
    )
  }

  export default Transactions
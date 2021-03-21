import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'

function DataFetching() {
    const [contract, setContract] = useState(null);
    const [transactions, setTransactions] = useState(null);

    const fetchData = () => {
    const url = 'https://api.covalenthq.com/v1/1/tokens/0xb80fbf6cdb49c33dc6ae4ca11af8ac47b0b4c0f3/nft_metadata/432/?key=ckey_693c563ac29c41bcbccfbe9326d';
    const url2 = 'https://api.covalenthq.com/v1/1/tokens/0xb80fbf6cdb49c33dc6ae4ca11af8ac47b0b4c0f3/nft_transactions/432/?key=ckey_693c563ac29c41bcbccfbe9326d';
    
    const getMetaData = axios.get(url);
    const getTransactions = axios.get(url2);
    
    axios.all([getMetaData, getTransactions]).then(
        axios.spread((...allData) => {
            const allDataPlayer = allData;
            const getTranData = allData;

            console.log(allDataPlayer);
            console.log(getTranData);
        })
    )
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>  
        </div>
    )
  }

  export default DataFetching